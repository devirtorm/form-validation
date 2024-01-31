import Form from "@/components/Form";

function page() {
  return (
    <div className=" mt-10 font-black">
      <p className="text-center mb-10 text-2xl">
        Validación de
        <span className="text-indigo-600"> formularios</span>
      </p>

      <Form />
    </div>
  );
}

export default page;
