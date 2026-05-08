import React, { useEffect, useState } from 'react'
import { Box, Card, Container, Grid, Stack } from '@sanity/ui'
import { useClient } from 'sanity'
import { StatCard } from './StatCard'
import { QuickLinks } from './QuickLinks'
import { RecentActivity } from './RecentActivity'
import { WelcomeBanner } from './WelcomeBanner'
import { ClipboardText, Briefcase, Article, Trophy, Package } from '@phosphor-icons/react'
import { useRouter } from 'sanity/router'

export function ZutraDashboard() {
  const client = useClient({ apiVersion: '2024-04-28' })
  const { navigateUrl } = useRouter() as any
  const [stats, setStats] = useState({ reports: 0, services: 0, posts: 0, cases: 0, resources: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await client.fetch(`{
          "reports": count(*[_type == "auditReport" && !(_id in path("drafts.**"))]),
          "services": count(*[_type == "service" && !(_id in path("drafts.**"))]),
          "posts": count(*[_type == "post" && !(_id in path("drafts.**"))]),
          "cases": count(*[_type == "caseStudy" && !(_id in path("drafts.**"))]),
          "resources": count(*[_type == "resource" && !(_id in path("drafts.**"))])
        }`)
        setStats(result)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [client])

  return (
    <Container width={4}>
      <Box paddingY={5} paddingX={4}>
        <Stack space={5}>
          
          <WelcomeBanner />

          <Grid columns={[1, 2, 3, 5]} gap={4}>
            <StatCard 
              title="Reportes" 
              value={loading ? '-' : stats.reports} 
              icon={ClipboardText} 
              color="blue"
              onClick={() => navigateUrl({ path: '/structure/consultoria;reportesDeAuditoria' })}
            />
            <StatCard 
              title="Servicios" 
              value={loading ? '-' : stats.services} 
              icon={Briefcase} 
              color="purple"
              onClick={() => navigateUrl({ path: '/structure/sitioWeb;servicios' })}
            />
            <StatCard 
              title="Artículos" 
              value={loading ? '-' : stats.posts} 
              icon={Article} 
              color="green"
              onClick={() => navigateUrl({ path: '/structure/blog;articulos' })}
            />
            <StatCard 
              title="Casos" 
              value={loading ? '-' : stats.cases} 
              icon={Trophy} 
              color="yellow"
              onClick={() => navigateUrl({ path: '/structure/sitioWeb;portfolioCasos' })}
            />
            <StatCard 
              title="Recursos" 
              value={loading ? '-' : stats.resources} 
              icon={Package} 
              color="blue"
              onClick={() => navigateUrl({ path: '/structure/sitioWeb;recursosDigitales' })}
            />
          </Grid>

          <Grid columns={[1, 1, 3]} gap={4} marginTop={2}>
            <Box style={{ gridColumn: 'span 2' }}>
              <Card padding={4} radius={3} shadow={1} style={{ border: '1px solid var(--card-border-color)' }}>
                <RecentActivity />
              </Card>
            </Box>
            
            <Box style={{ gridColumn: 'span 1' }}>
              <Card padding={4} radius={3} shadow={1} style={{ border: '1px solid var(--card-border-color)', height: '100%' }}>
                <QuickLinks />
              </Card>
            </Box>
          </Grid>

        </Stack>
      </Box>
    </Container>
  )
}
