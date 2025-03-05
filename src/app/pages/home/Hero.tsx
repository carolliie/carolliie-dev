export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute justify-center inset-0 w-max h-full z-0 container-estrelas">
        {[...Array(50)].map((_, index) => {
          const uniqueIndex = Math.floor(Math.random() * 50) + 5;
          return (
            <span
              key={index}
              className="icone"
              style={{ "--i": uniqueIndex } as React.CSSProperties}
            ></span>
          );
        })}
      </div>
      
      <div className="relative isolate px-6 pt-14 lg:px-8 z-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl xl:py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              Olá, eu sou<br />
              <span className="pencerio">Ana Caroline!</span>
            </h1>
            <p className="mt-8 text-lg text-white sm:text-xl">
              Desenvolvedora de software apaixonada por criar{" "}
              <strong>soluções inovadoras e funcionais</strong> para a web.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#FFA0D4] px-6 py-2 text-sm font-medium text-white shadow-xs hover:bg-[#d685b2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ver mais
              </a>
              <a href="#" className="text-sm font-medium text-[#F2FFAB]">
                Fale comigo <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
