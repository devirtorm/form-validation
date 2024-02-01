import Form from "@/components/Form";
import Footer from "@/components/Footer";

function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-10 flex-1">
        <p className="text-center font-black mb-10 text-2xl dark:text-white">
          Validación de
          <span className="text-indigo-600"> formularios</span>
        </p>

        <Form />
      </div>
      <Footer />
    </div>
  );
}

export default page;
