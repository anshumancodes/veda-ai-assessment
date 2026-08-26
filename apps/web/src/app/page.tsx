import { AssessmentUpload } from "@/components/upload/assessment-upload";
import { TopNav } from "@/components/layout/top-nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <TopNav />

      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col items-center justify-center px-6 py-12">
        <div className="mb-8 max-w-2xl text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Upload{" "}
            <span
              style={{
                color: "#e8521a",
                backgroundColor: "#fff0eb",
                padding: "0 8px 3px",
                borderRadius: "6px",
              }}
            >
              Question Paper &amp; Answer Sheets
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload both files to get started
          </p>
        </div>

        <AssessmentUpload />
      </section>
    </main>
  );
}
