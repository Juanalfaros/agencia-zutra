import { getSteps, easterEggs, bossEasterEggs, type BotState, type Step } from "../../data/bot-content";

export function initWhatsAppBot() {
    const widget = document.getElementById("wa-bot-widget") as HTMLElement;
    if (!widget) return;
    const phone = widget.dataset.phone || "+56942009050";
    const triggerBtn = document.getElementById("wa-trigger-btn");
    const closeBtn = document.getElementById("wa-close-btn");
    const resetBtn = document.getElementById("wa-reset-btn");
    const messagesArea = document.getElementById("wa-bot-messages");
    const inputArea = document.getElementById("wa-bot-input-area");

    if (!triggerBtn || !messagesArea || !inputArea || !resetBtn) return;
    if (widget.dataset.initialized === "true") return;
    widget.dataset.initialized = "true";

    setTimeout(() => {
        triggerBtn.classList.add("visible");
    }, 1500);

    const botState: BotState = {
        step: 0,
        isBoss: false,
        data: {
            name: "",
            email: "",
            service: "",
            urgency: "",
        },
    };

    const storedState = sessionStorage.getItem("zutraBotState");
    if (storedState) {
        try {
            const parsed = JSON.parse(storedState);
            Object.assign(botState, parsed);
        } catch (e) {
            console.error("Error parsing bot state", e);
        }
    }

    let steps = getSteps(botState) as Step[];

    const refreshSteps = () => {
        steps = getSteps(botState) as Step[];
    };

    const saveState = () => {
        sessionStorage.setItem("zutraBotState", JSON.stringify(botState));
    };

    const scrollToBottom = () => {
        if (messagesArea) {
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }
    };

    const _renderMsg = (text: string, sender: string) => {
        if (typeof text !== "string" || !messagesArea) return;
        const msg = document.createElement("div");
        msg.className = `msg-bubble msg-${sender}`;

        const formattedText = text.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>",
        );
        msg.innerHTML = formattedText;

        messagesArea.appendChild(msg);
        scrollToBottom();
    };

    const addMessage = async (
        text: string,
        sender: "bot" | "user",
        immediate = false,
    ): Promise<void> => {
        return new Promise(async (resolve) => {
            if (!messagesArea) {
                resolve();
                return;
            }
            if (sender === "bot" && !immediate) {
                const typingObj = document.createElement("div");
                typingObj.className = "msg-bubble msg-bot typing-indicator";
                typingObj.innerHTML =
                    '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
                messagesArea.appendChild(typingObj);
                scrollToBottom();

                await new Promise<void>((r) => setTimeout(r, 600));
                typingObj.remove();
                _renderMsg(text, sender);
                await new Promise<void>((r) =>
                    setTimeout(r, 400 + Math.random() * 400),
                );
                resolve();
            } else {
                _renderMsg(text, sender);
                resolve();
            }
        });
    };

    const checkEasterEggs = async (text: string) => {
        const cleanText = text.toLowerCase();
        const eggs: Record<
            string,
            { keywords: string[]; responses: string[] }
        > = easterEggs;

        for (const key in eggs) {
            if (
                eggs[key].keywords.some((k: string) =>
                    cleanText.includes(k),
                )
            ) {
                const responses = eggs[key].responses;
                const randomResponse =
                    responses[Math.floor(Math.random() * responses.length)];
                await addMessage(randomResponse, "bot", false);
                return true;
            }
        }
        return false;
    };

    const runCurrentStep = async (immediate = false) => {
        let currentStepConfig = steps[botState.step];

        while (
            currentStepConfig &&
            currentStepConfig.condition &&
            !currentStepConfig.condition(botState)
        ) {
            botState.step++;
            saveState();
            currentStepConfig = steps[botState.step];
        }

        if (currentStepConfig) {
            const questionText =
                typeof currentStepConfig.question === "function"
                    ? currentStepConfig.question(botState)
                    : (currentStepConfig.question as string);
            await addMessage(questionText, "bot", immediate);
            renderInput(currentStepConfig);
        } else {
            await addMessage(
                "Parece que ya recabamos todos tus datos. Haz clic abajo para ir a WhatsApp.",
                "bot",
                immediate,
            );
            renderInput(steps[steps.length - 1]);
        }
    };

    const handleUserReply = async (value: string, stepConfig: Step) => {
        if (stepConfig.id === "name") {
            const bossEggs = bossEasterEggs as { keywords: string[], responses: string[] };
            const isBoss = bossEggs.keywords.some((k) =>
                value.toLowerCase().includes(k),
            );
            if (isBoss) {
                inputArea.innerHTML = "";
                const bossName = value.trim();
                const respIndex = Math.floor(Math.random() * bossEggs.responses.length);
                botState.bossResponseIndex = respIndex;
                const rawResp = bossEggs.responses[respIndex];
                const bossResp = rawResp.replace("${name}", bossName);

                await addMessage(value, "user", true);
                await addMessage(bossResp, "bot", false);

                botState.data.name = bossName;
                botState.isBoss = true;
                botState.step++;
                refreshSteps();
                saveState();

                setTimeout(() => {
                    runCurrentStep();
                }, 1500);
                return;
            }
        }

        inputArea.innerHTML = "";
        await addMessage(value, "user", true);

        if (stepConfig.id === "custom_service") {
            botState.data.service = value;
        } else if (stepConfig.id !== "final") {
            botState.data[stepConfig.id] = value;
        }

        botState.step++;
        saveState();
        runCurrentStep();
    };

    const finishAndRedirect = async () => {
        inputArea.innerHTML =
            '<span style="color:var(--color-muted); font-size:0.875rem; text-align:center; display:block; width:100%; padding: 0.5rem 0;">Conectando con un embajador...</span>';

        // 1. Abrir WA inmediatamente (sincrónico al click para evitar popup blocker)
        const currentUrl = window.location.href;
        const msg = `Hola 👋 Soy *${botState.data.name}* (${botState.data.email}).\n\nMe interesa ayuda con: *${botState.data.service}*.\nDisponibilidad para arrancar: *${botState.data.urgency}*.\n\n_(Vengo desde: ${currentUrl})_`;
        const cleanedPhone = phone.replace(/[^0-9\+]/g, "");
        const waUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(msg)}`;

        window.open(waUrl, "_blank");
        closeWidget();
        sessionStorage.removeItem("zutraBotState");

        // 2. Fetch en paralelo sin bloquear la redirección
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);

        fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(botState.data),
            signal: controller.signal,
        })
            .catch((e) => console.error("Non-blocking lead capture error", e))
            .finally(() => {
                clearTimeout(timeout);
            });
    };

    const renderInput = (stepConfig: Step) => {
        inputArea.innerHTML = "";

        if (stepConfig.type === "text" || stepConfig.type === "email") {
            const group = document.createElement("div");
            group.className = "wa-input-group";

            const input = document.createElement("input");
            input.type = stepConfig.type === "email" ? "email" : "text";
            input.className = "wa-input";
            input.placeholder = stepConfig.placeholder || "";

            const btn = document.createElement("button");
            btn.className = "wa-send-btn";
            btn.innerHTML = '<i class="ph-fill ph-paper-plane-right"></i>';

            group.appendChild(input);
            group.appendChild(btn);
            inputArea.appendChild(group);

            if (window.innerWidth > 768) {
                input.focus();
            }

            let isSubmitting = false;
            const handleSubmit = async () => {
                if (isSubmitting) return;
                const val = input.value.trim();
                if (!val) return;

                isSubmitting = true;
                btn.disabled = true;

                if (stepConfig.type === "text") {
                    const triggered = await checkEasterEggs(val);
                    if (triggered) {
                        input.value = "";
                        setTimeout(async () => {
                            const currentStepConfig = steps[botState.step] as Step;
                            const questionText = currentStepConfig.reiteration
                                ? currentStepConfig.reiteration
                                : (typeof currentStepConfig.question === "function"
                                    ? (currentStepConfig.question(botState) as string)
                                    : (currentStepConfig.question as string));

                            await addMessage(
                                `Pero ya, en serio... **${questionText}**`,
                                "bot",
                                false,
                            );
                            isSubmitting = false;
                            btn.disabled = false;
                            input.focus();
                        }, 1200);
                        return;
                    }
                }

                if (stepConfig.type === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(val)) {
                        input.classList.add("error-shake");
                        setTimeout(() => input.classList.remove("error-shake"), 500);

                        let errorMsg = "Ese correo está más raro que web de 10 lucas... ¿lo revisas? 🧐";
                        if (!val.includes("@")) {
                            errorMsg = "Le falta el @ jefe... ¿lo revisas? 🧐";
                        } else if (!val.includes(".")) {
                            errorMsg = "El dominio está incompleto. ¿Será .com o .cl? 🤔";
                        }

                        await addMessage(errorMsg, "bot", false);
                        isSubmitting = false;
                        btn.disabled = false;
                        input.focus();
                        return;
                    }
                }

                handleUserReply(val, stepConfig);
            };

            btn.addEventListener("click", handleSubmit);
            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") handleSubmit();
            });
        } else if (stepConfig.type === "chips") {
            const chipsContainer = document.createElement("div");
            chipsContainer.className = "wa-chips";

            if (stepConfig.options) {
                stepConfig.options.forEach((opt: string) => {
                    const chip = document.createElement("button");
                    chip.className = "wa-chip";
                    chip.textContent = opt;
                    chip.addEventListener("click", () => {
                        chipsContainer.style.pointerEvents = "none";
                        handleUserReply(opt, stepConfig);
                    });
                    chipsContainer.appendChild(chip);
                });
            }

            inputArea.appendChild(chipsContainer);
        } else if (stepConfig.type === "cta") {
            const btn = document.createElement("button");
            btn.className = "wa-cta-btn";
            btn.innerHTML = `<i class="ph-fill ph-whatsapp-logo"></i> ${stepConfig.buttonText}`;

            btn.addEventListener("click", finishAndRedirect);
            inputArea.appendChild(btn);
        }

        setTimeout(scrollToBottom, 50);
    };

    const _rebuildHistoryVisually = async () => {
        for (let i = 0; i < botState.step; i++) {
            const stepCfg = steps[i];
            if (stepCfg.condition && !stepCfg.condition(botState)) continue;

            const questionText =
                typeof stepCfg.question === "function"
                    ? stepCfg.question(botState)
                    : (stepCfg.question as string);
            _renderMsg(questionText, "bot");

            let userAnswer = "";
            if (stepCfg.id === "custom_service") {
                userAnswer = botState.data.service;
            } else if (botState.data[stepCfg.id]) {
                userAnswer = botState.data[stepCfg.id];
            }

            if (userAnswer) {
                // Si es el primer paso y el estado tiene isBoss, recreamos el diálogo especial
                if (stepCfg.id === "name" && botState.isBoss) {
                    const bossEggs = bossEasterEggs as { keywords: string[], responses: string[] };
                    const rawResp = bossEggs.responses[botState.bossResponseIndex ?? 0];
                    const bossResp = rawResp.replace("${name}", userAnswer);
                    _renderMsg(userAnswer, "user");
                    _renderMsg(bossResp, "bot");
                } else {
                    _renderMsg(userAnswer, "user");
                }
            }
        }
        return new Promise((r) => setTimeout(r, 200));
    };

    const openWidget = () => {
        widget.classList.add("open");
        triggerBtn.classList.add("hidden-by-widget");

        const badge = document.getElementById("wa-notification-badge");
        if (badge) badge.remove();

        if (messagesArea.children.length === 0) {
            if (botState.step > 0) {
                _rebuildHistoryVisually().then(() => {
                    runCurrentStep(true);
                });
            } else {
                runCurrentStep(false);
            }
        }
    };

    const closeWidget = () => {
        widget.classList.remove("open");
        triggerBtn.classList.remove("hidden-by-widget");
    };

    const resetWidget = () => {
        sessionStorage.removeItem("zutraBotState");
        botState.step = 0;
        botState.isBoss = false;
        botState.bossResponseIndex = undefined;
        botState.data = {
            name: "",
            email: "",
            service: "",
            urgency: "",
        };
        refreshSteps();
        messagesArea.innerHTML = "";
        runCurrentStep(false);
    };

    triggerBtn.addEventListener("click", openWidget);
    if (closeBtn) closeBtn.addEventListener("click", closeWidget);
    resetBtn.addEventListener("click", resetWidget);
}
