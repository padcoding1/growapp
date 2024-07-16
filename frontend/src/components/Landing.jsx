import { useParallax, Parallax } from "react-scroll-parallax";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import houseplant from "../assets/houseplant.jpg";
import houseplant2 from "../assets/houseplant2.jpg";
import houseplant3 from "../assets/houseplant3.jpg";
import weeds from "../assets/weeds.png";

const Landing = () => {
  return (
    <main>
      <div className="my-24 flex h-96 w-full items-center justify-between gap-4 px-8">
        <h1 className="w-1/2 text-center text-2xl font-semibold text-green-600 sm:text-6xl">
          Take care of your plants the right way.
        </h1>
        <div className="grid h-[500px] grid-cols-1 grid-rows-2 gap-4 overflow-hidden p-16 sm:grid-cols-2">
          <img src={houseplant2} alt="houseplant" className="h-full w-full" />
          <img
            src={houseplant}
            alt="houseplant"
            className="row-span-2 hidden h-full sm:block"
          />
          <img src={houseplant3} alt="houseplant" className="h-full w-full" />
        </div>
      </div>
      <Parallax speed={-10}>
        <section className="flex h-[400px] flex-col items-center justify-center bg-green-600 p-8 text-white shadow-lg">
          <h2 className="text-center text-2xl font-semibold">
            Get started with GrowApp today!
          </h2>
          <p className="text-center">
            GrowApp is a platform that helps you take care of your plants the
            right way. Sign up today to get started!
          </p>
          <div className="mt-4 flex justify-center">
            <Link to="/signup">
              <button className="rounded-full bg-white px-4 py-2 text-green-600">
                Sign up
              </button>
            </Link>
          </div>
        </section>
      </Parallax>
      <section className="h-[900px]">
        <motion.div
          className="flex items-center justify-between gap-4 p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <img src={weeds} alt="houseplant" className="h-[700px] w-1/2" />
          <div>
            <h2 className="text-2xl font-semibold text-green-600 sm:text-4xl">
              Keep track of your plants
            </h2>
            <p>
              GrowApp helps you keep track of your plants by providing you with
              information about your plants' watering and sunlight needs.
            </p>
          </div>
        </motion.div>
      </section>
      <section>
        <Parallax speed={-10} className="h-[600px] bg-green-600"></Parallax>
      </section>
    </main>
  );
};

export default Landing;
