export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="p-8 rounded-2xl shadow-2xl bg-white text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
          🚀 Tailwind is Working!
        </h1>
        <p className="text-gray-700">
          If you see blue text inside a white card with a dark background, Tailwind is set up correctly.
        </p>
        <button className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md">
          Test Button
        </button>
      </div>
    </div>
  )
}
