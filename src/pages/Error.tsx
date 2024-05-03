const Error = () => {
  return (
    <div className='flex flex-col w-full h-full items-center justify-center gap-4'>
      <span className='text-lg font-semibold text-[#3362ff]'>404 Page</span>
      <span className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
        Page not found
      </span>
      <span className='mt-6 text-base leading-7 text-gray-600'>
        Sorry, we couldn’t find the page you’re looking for.
      </span>
      <span className='text-4xl text-orange-500'></span>
    </div>
  );
};
export default Error;
