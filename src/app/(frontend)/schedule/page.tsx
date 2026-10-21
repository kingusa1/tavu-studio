import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import MindbodyWidget from '@/components/mindbody/MindbodyWidget';
import { getGlobal } from '@/lib/cms/globals';
import { getPolicies } from '@/lib/cms/policies';
import { getSiteData } from '@/lib/cms/site';
import type { SchedulePage as SchedulePageData } from '@/payload-types';

// `getPolicies()` is still a package B stub returning `[]`, typed against the stub Policies
// collection (title + slug only, §6) — package B's merge provides the real `label`/`text`
// fields (§2.6). Same bridge used for Offers; a no-op once B merges.
type PolicyLike = { id: number; label?: string | null; text?: string | null };
function asPolicyLike(policy: unknown): PolicyLike {
  return policy as PolicyLike;
}

export default async function SchedulePage() {
  const [data, policies, { settings }] = await Promise.all([
    getGlobal<SchedulePageData>('schedule-page'),
    getPolicies('schedule'),
    getSiteData(),
  ]);

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      <main className="flex-grow pt-32 pb-16 px-4 container mx-auto">
        <div className="max-w-5xl mx-auto">
          <MotionWrapper delay={0} direction="up" immediate>
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline mb-6 text-primary">{data.title}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{data.intro}</p>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.1} direction="up">
            <div className="bg-white rounded-2xl p-4 min-h-[700px] shadow-sm">
              <MindbodyWidget key="schedules-widget" widgetType="Schedules" widgetId={settings.mindbody.scheduleWidgetId ?? ''} />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2} direction="up">
            <div className="mt-12 bg-card border border-border p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-primary mb-4">{data.bookingInfo?.heading}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/70">
                {policies.map((policy) => {
                  const p = asPolicyLike(policy);
                  return (
                    <div key={p.id} className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>
                        <strong>{p.label}</strong> {p.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </main>

      <Footer />
    </div>
  );
}
