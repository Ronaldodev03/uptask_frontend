import LoaderMensaje from "./LoaderMessage";

const Loader = () => {
  return (
    <div className=" h-screen flex items-center justify-center p-4 bg-gray-800">
      <LoaderMensaje className=" border border-white text-white p-4 rounded-md" />
    </div>
  );
};

export default Loader;
