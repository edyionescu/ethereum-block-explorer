function Error({ code = 404, error = {} }) {
  if (error.stack) {
    console.log(error.stack);
  }

  const errorType = {
    404: 'Page not found',
    400: 'Client error',
    500: 'Server error',
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid place-items-center bg-white py-28 rounded-md">
        <div className="text-center">
          <p className="font-semibold text-gray-500 text-2xl">
            {code} <span className="text-gray-900">{errorType[code]}</span>
          </p>
          {error?.message && <p className="text-base mt-3 text-gray-900">{error.message}</p>}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="/" className="text-sm font-semibold leading-7 text-gray-950-600">
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
