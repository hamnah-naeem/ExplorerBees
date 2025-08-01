import React from "react";
import { useState } from "react";
import Hero from "../components/Hero";
import ServiceIcons from "../components/ServiceIcons";
import { Link } from "react-router-dom";
import ExploreCities from "../components/ExploreCities";
import WhyChooseUs from "../components/WhyChooseUs";
import ContactUs from "../components/ContactUs";
import ExploreHotels from "../components/ExploreHotels";
import ExploreRestaurants from "../components/ExploreRestaurants";
import ThingsToDo from "../components/ThingsToDo";

export default function Home() {
  return (
    <>
    <Hero />
    <ServiceIcons />
    <ExploreCities />
    <ExploreHotels/>
    <ExploreRestaurants/>
    <ThingsToDo />
    <WhyChooseUs />
    <ContactUs />  
    </>
  );
}

