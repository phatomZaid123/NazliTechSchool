import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Megaphone,
  Presentation,
  Share2,
  Trophy,
  Users,
} from "lucide-react"

const publishingFlows = [
  {
    title: "Student achievements",
    icon: Trophy,
    status: "Live on landing page",
    destination: "Homepage highlights and student success stories",
    note: "Use this to publish awards, project wins, hackathon recaps, and showcase clips.",
  },
  {
    title: "Social media updates",
    icon: Share2,
    status: "Ready to publish",
    destination: "Public social wall and external channels",
    note: "The admin can approve the caption, choose the platform, and control when the post goes live.",
  },
  {
    title: "Class meeting links",
    icon: CalendarClock,
    status: "Scheduled for class views",
    destination: "Student view and instructor view",
    note: "Sessions stay on Google Meet, but the website becomes the trusted launch point.",
  },
]

const sessions = [
  {
    title: "AI Coding Lab",
    audience: "Students",
    host: "Instructor Amina Yusuf",
    slot: "Tue, 4:00 PM",
    action: "Open Google Meet",
    status: "Scheduled",
  },
  {
    title: "Physics Lab Prep",
    audience: "Instructors",
    host: "Mentor David Park",
    slot: "Wed, 10:30 AM",
    action: "Share teaching link",
    status: "Draft",
  },
  {
    title: "Parent Progress Briefing",
    audience: "Families",
    host: "Admin Team",
    slot: "Fri, 2:00 PM",
    action: "Send reminder",
    status: "Ready",
  },
]

const prototypeFlow = [
  "Admin updates a record once",
  "Content is approved or scheduled",
  "The right audience sees the fresh version",
]

export function AdminPrototypeSection() {
  return (
    <section className="container px-4 pb-6 md:px-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-border/40 bg-card/65 p-8 backdrop-blur-xl">
          <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-300">
            Prototype Storyboard
          </Badge>
          <h3 className="mt-5 text-3xl font-bold text-foreground">Show the admin as the source of truth.</h3>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
            The clearest prototype story is that the admin updates achievements, social posts, and class access from one
            place, then those changes appear in the right public or internal view without editing the same content twice.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {publishingFlows.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border/40 bg-background/55 p-5 shadow-sm shadow-black/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/70 text-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="border-border/50 bg-background/70 text-xs text-foreground">
                    {item.status}
                  </Badge>
                </div>
                <h4 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{item.destination}</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border/40 bg-background/45 p-5">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-foreground">
              {prototypeFlow.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-border/50 bg-card/70 px-3 py-1.5">{step}</span>
                  {index < prototypeFlow.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/40 bg-card/65 p-8 backdrop-blur-xl">
          <Badge variant="outline" className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
            Google Meet Demo
          </Badge>
          <h3 className="mt-5 text-3xl font-bold text-foreground">Make the website the class launch pad.</h3>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Since live sessions still happen externally on Google Meet, the prototype should show the admin scheduling the
            meeting here and the student or instructor clicking through from their dashboard when class time arrives.
          </p>

          <div className="mt-6 space-y-4">
            {sessions.map((session) => (
              <div
                key={session.title}
                className="rounded-2xl border border-border/40 bg-background/55 p-5 shadow-sm shadow-black/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{session.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{session.host}</p>
                  </div>
                  <Badge variant="outline" className="border-border/50 bg-card/70 text-foreground">
                    {session.status}
                  </Badge>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/40 px-3 py-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {session.audience}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/40 px-3 py-1.5">
                    <CalendarClock className="h-3.5 w-3.5" />
                    {session.slot}
                  </span>
                </div>

                <Button variant="outline" className="mt-5 w-full justify-between rounded-xl border-border/40 bg-background/60">
                  <span className="inline-flex items-center gap-2">
                    <Presentation className="h-4 w-4" />
                    {session.action}
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Demo recommendation
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Walk the client through one simple flow: admin schedules a class, the student sees an upcoming session card,
              and the instructor sees the same session with a teaching link. The button then opens Google Meet externally.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/40 px-3 py-1.5">
                <Megaphone className="h-3.5 w-3.5" />
                Landing page updates
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/40 px-3 py-1.5">
                <GraduationCap className="h-3.5 w-3.5" />
                Student view
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/40 px-3 py-1.5">
                <Users className="h-3.5 w-3.5" />
                Instructor view
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
