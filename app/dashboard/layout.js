import PageHeader from "@/components/page-header";
import Footer from "@/components/footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader className="mt-8 mb-8 w-full border-b bg-muted py-3" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}