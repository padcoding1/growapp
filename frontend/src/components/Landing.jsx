import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import houseplant from "../assets/houseplant.jpg";
import houseplant2 from "../assets/houseplant2.jpg";
import houseplant3 from "../assets/houseplant3.jpg";
import weeds from "../assets/weeds.png";
import plant1 from "../assets/carouselplant1.png";
import plant2 from "../assets/carouselplant2.png";
import plant3 from "../assets/carouselplant3.png";
import plant4 from "../assets/carouselplant4.png";
import plant5 from "../assets/carouselplant5.png";

const Landing = () => {
  const carouselImages = [plant1, plant2, plant3, plant4, plant5];
  return (
    <main>
      <motion.section
        className="my-24 flex h-96 w-full items-center justify-between gap-4 px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <motion.h1
          className="w-1/2 text-center text-2xl font-semibold text-green-600 sm:text-6xl"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 0.8,
            bounce: 0.4,
            stiffness: 200,
          }}
        >
          Take care of your plants the right way.
        </motion.h1>
        <div className="grid h-[500px] grid-cols-1 grid-rows-2 gap-4 overflow-hidden p-16 sm:grid-cols-2">
          <img src={houseplant2} alt="houseplant" className="h-full w-full" />
          <img
            src={houseplant}
            alt="houseplant"
            className="row-span-2 hidden h-full sm:block"
          />
          <img src={houseplant3} alt="houseplant" className="h-full w-full" />
        </div>
      </motion.section>
      <Parallax speed={20}>
        <motion.section
          className="flex h-[400px] flex-col items-center justify-center bg-green-600 p-8 text-white shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
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
        </motion.section>
      </Parallax>
      <section className="h-[800px]">
        <motion.div
          className="flex items-center justify-between gap-4 p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <img src={weeds} alt="houseplant" className="h-[700px] w-1/2" />
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 0.8,
              bounce: 0.4,
              stiffness: 200,
            }}
          >
            <h2 className="text-2xl font-semibold text-green-600 sm:text-4xl">
              Keep track of your plants
            </h2>
            <p>
              GrowApp helps you keep track of your plants by providing you with
              information about your plants' watering and sunlight needs.
            </p>
          </motion.div>
        </motion.div>
      </section>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Parallax
          speed={20}
          className="flex h-[600px] flex-col items-center justify-center gap-8 bg-green-600"
        >
          <h1 className="text-3xl text-white">
            Add plants to your collection!
          </h1>
          <Carousel
            opts={{
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-2/3"
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-2">
                        <img
                          src={image}
                          alt="houseplant"
                          className="h-full w-full"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Parallax>
      </motion.section>
      <motion.section
        className="flex h-[500px] translate-y-20 flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold text-green-600">FAQ</h2>
        <Accordion
          type="single"
          className="w-1/3 text-lg text-green-600"
          id="my-section"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is this app free?</AccordionTrigger>
            <AccordionContent>
              Yes. This app is completely free to use.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I sign up?</AccordionTrigger>
            <AccordionContent>
              You can sign up by clicking the "Sign up" button at the top of the
              page.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I add a plant?</AccordionTrigger>
            <AccordionContent>
              You can add a plant by clicking the "Add plant" button on the
              dashboard, searching for the plant you want to add, and clicking
              on the plant to add it to your collection.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.section>
    </main>
  );
};

export default Landing;
