import React from 'react'

export function ZutraLogo(props: any) {
  return (
    <svg 
      id="Capa_2" 
      data-name="Capa 2" 
      viewBox="0 0 100.8 100.79" 
      style={{ width: '100%', height: '100%', display: 'block', maxHeight: '32px' }}
    >
      <g id="Capa_1-2" data-name="Capa 1">
        <g>
          <rect fill="var(--zutra-accent, #f05)" width="100.8" height="100.79"/>
          <path fill={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? "#fff8e0" : "#080501"} d="M100.8,66.36v15.91H29.79c-5.61,0-9.75-4.37-9.75-11.42,0-5.82,2.02-8.86,5.48-11.54l25.65-19.59c.55-.46.89-.79.89-1.01,0-.34-.34-.56-1.11-.56h-20.13c-4.78,0-8.66-3.88-8.66-8.66v-6.58h46.92c6.5,0,10.99,3.82,10.99,10.87,0,6.61-2.7,9.74-5.38,11.86l-24.86,19.05c-.57.44-.89.89-.89,1.23s.1.44.99.44h50.87Z"/>
        </g>
      </g>
    </svg>
  )
}
