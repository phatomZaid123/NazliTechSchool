export default function Worksheets() {
  return (
    <section className="bg-white py-16" id="worksheets">
      <div className="section-glass-wrap mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-lg font-semibold leading-8 text-indigo-600">
            Worksheets
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Interactive Learning Materials
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Enhance your learning experience with our interactive worksheets,
            designed to reinforce concepts and provide hands-on practice.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Example worksheet cards */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Worksheet 1</h3>
            <p className="mt-2 text-gray-600">
              A brief description of Worksheet 1.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Worksheet 2</h3>
            <p className="mt-2 text-gray-600">
              A brief description of Worksheet 2.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Worksheet 3</h3>
            <p className="mt-2 text-gray-600">
              A brief description of Worksheet 3.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
