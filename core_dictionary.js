// =====================================================================
// FILE: core_dictionary.js (The Game's Library)
// =====================================================================
// Imagine this file like a huge real-world library full of scientific terms. 
// Without this file, Osmosis wouldn't know what words or definitions to test you on!

/**
 * The 'wordBank' is essentially a giant filing cabinet. 
 * It has 26 drawers, one for each letter of the alphabet (A-Z).
 * Inside each drawer, there are folders (objects). 
 * Each folder holds a scientific "word" and its simple "definition".
 */
const wordBank = {
  A: [
    { word: "atom", definition: "Smallest unit of matter" },
    { word: "angle", definition: "Space between two intersecting lines" },
    { word: "axis", definition: "A line used as a reference for measurement" },
    { word: "astronomy", definition: "The scientific study of stars, planets, and the universe" },
    { word: "algorithm", definition: "A set of rules to be followed in calculations" },
    { word: "ampere", definition: "The base unit of electric current" },
    { word: "allele", definition: "One of two or more alternative forms of a gene" },
    { word: "asteroid", definition: "A small rocky body orbiting the sun" },
    { word: "acceleration", definition: "The rate of change of velocity per unit of time" },
    { word: "atmosphere", definition: "The envelope of gases surrounding the earth or another planet" },
    { word: "anomaly", definition: "Something that deviates from what is standard or normal" },
    { word: "antibody", definition: "A blood protein produced in response to a specific antigen" },
    { word: "aorta", definition: "The main artery of the body, supplying oxygenated blood" },
    { word: "apoptosis", definition: "The death of cells which occurs as a normal and controlled part of growth" },
    { word: "archimedes", definition: "Scientific name associated with the law of buoyancy" },
    { word: "asteroid", definition: "A rock orbiting the Sun that is smaller than a planet" },
    { word: "aerodynamics", definition: "The study of the motion of air, particularly its interaction with a solid object" },
    { word: "allele", definition: "One of two or more alternative forms of a gene" },
    { word: "alveolar", definition: "Relating to the alveoli of the lungs" },
    { word: "amethyst", definition: "A precious stone consisting of a violet or purple variety of quartz" },
    { word: "antiform", definition: "A geological fold that is convex upward" },
    { word: "analyzer", definition: "An instrument used for analyzing a substance" },
    { word: "aphelion", definition: "The point in the orbit of a planet, asteroid, or comet at which it is furthest from the sun" },
    { word: "aperture", definition: "An opening, hole, or gap; especially in an optical system" },
    { word: "arachnid", definition: "An arthropod of the class Arachnida, such as a spider or scorpion" },
    { word: "argon", definition: "The chemical element of atomic number 18, an inert gaseous element" },
    { word: "asbestos", definition: "A highly heat-resistant fibrous silicate mineral that can be woven into fabrics" },
    { word: "astrophysics", definition: "The branch of astronomy concerned with the physical nature of stars" },
    { word: "attenuation", definition: "The reduction of the amplitude of a signal, electric current, or other oscillation" },
    { word: "autosome", definition: "Any chromosome that is not a sex chromosome" },
    { word: "avalanche", definition: "A mass of snow, ice, and rocks falling rapidly down a mountainside" },
    { word: "axon", definition: "The long threadlike part of a nerve cell along which impulses are conducted" },
    { word: "azimuth", definition: "The direction of a celestial object from the observer" },
    { word: "altitude", definition: "The height of an object or point in relation to sea level" },
    { word: "anther", definition: "The part of a stamen that contains the pollen" },
    { word: "aqueous", definition: "Of or containing water, typically as a solvent" },
    { word: "aquifer", definition: "A body of permeable rock which can contain or transmit groundwater" },
    { word: "arthritis", definition: "Inflammation of one or more of your joints" },
    { word: "assimilation", definition: "The absorption and digestion of food or nutrients" },
    { word: "asymptote", definition: "A line that a curve approaches, as it heads towards infinity" }

  ],
  B: [
    { word: "binary", definition: "A system using only 0 and 1" },
    { word: "balance", definition: "A state where forces are equal" },
    { word: "battery", definition: "A device that stores and supplies energy" },
    { word: "biology", definition: "The scientific study of life and living organisms" },
    { word: "buoyancy", definition: "The upward force exerted by a fluid that opposes weight" },
    { word: "biome", definition: "A large naturally occurring community of flora and fauna" },
    { word: "biosphere", definition: "The regions of the surface and atmosphere occupied by living organisms" },
    { word: "basalt", definition: "A dark, fine-grained volcanic rock" },
    { word: "bacteria", definition: "Microscopic living organisms, usually one-celled, that can be found everywhere" },
    { word: "barometer", definition: "An instrument measuring atmospheric pressure" },
    { word: "bauxite", definition: "An amorphous clayey rock that is the chief commercial ore of aluminum" },
    { word: "biomass", definition: "The total mass of organisms in a given area or volume" },
    { word: "biomechanics", definition: "The study of the mechanical laws relating to the movement or structure of living organisms" },
    { word: "boson", definition: "A subatomic particle, such as a photon, which has zero or integral spin" },
    { word: "byte", definition: "A group of binary digits or bits operated on as a unit" },
    { word: "bacillus", definition: "A rod-shaped bacterium" },
    { word: "bacteriophage", definition: "A virus that parasitizes a bacterium by infecting it and reproducing inside it" },
    { word: "bandwidth", definition: "A range of frequencies within a given band" },
    { word: "barometer", definition: "An instrument measuring atmospheric pressure" },
    { word: "basaltic", definition: "Relating to or containing basalt" },
    { word: "benthic", definition: "Relating to or occurring at the bottom of a body of water" },
    { word: "bifurcate", definition: "Divide into two branches or forks" },
    { word: "bimetallic", definition: "Made of two different metals, often used in thermostats" },
    { word: "biochemistry", definition: "The branch of science concerned with the chemical processes within living organisms" },
    { word: "biomechanics", definition: "The study of the mechanical laws relating to the movement of living organisms" },
    { word: "bionics", definition: "The study of mechanical systems that function like parts of living organisms" },
    { word: "biosphere", definition: "The regions of the surface and atmosphere of the earth occupied by living organisms" },
    { word: "bivalve", definition: "An aquatic mollusk that has a compressed body enclosed within a hinged shell" },
    { word: "botany", definition: "The scientific study of plants" },
    { word: "breccia", definition: "Rock consisting of angular fragments cemented together" },
    { word: "bronchus", definition: "Any of the major air passages of the lungs that diverge from the windpipe" },
    { word: "buoyancy", definition: "The upward force exerted by a fluid that opposes the weight of an immersed object" },
    { word: "beaker", definition: "A lipped cylindrical glass container for laboratory use" },
    { word: "benthos", definition: "The flora and fauna found on the bottom of a sea or lake" },
    { word: "binomial", definition: "An algebraic expression of the sum or the difference of two terms" },
    { word: "boiling", definition: "The action of bringing a liquid to the temperature at which it bubbles and turns to vapor" }

  ],
  C: [
    { word: "cell", definition: "Basic unit of life" },
    { word: "circuit", definition: "A path through which electricity flows" },
    { word: "code", definition: "Instructions written for a computer" },
    { word: "chemistry", definition: "The study of matter and its interactions" },
    { word: "catalyst", definition: "A substance that speeds up a chemical reaction" },
    { word: "coulomb", definition: "The standard unit of electric charge" },
    { word: "chromosome", definition: "A threadlike structure of nucleic acids carrying genetic information" },
    { word: "convection", definition: "The transfer of heat by the circulation of a fluid" },
    { word: "capillary", definition: "Any of the fine branching blood vessels that form a network" },
    { word: "carbon", definition: "The chemical element of atomic number 6, forming organic compounds" },
    { word: "carnivore", definition: "An animal that feeds on flesh" },
    { word: "cartilage", definition: "Firm, whitish, flexible connective tissue" },
    { word: "cerebellum", definition: "The part of the brain at the back of the skull in vertebrates" },
    { word: "comet", definition: "A celestial object consisting of a nucleus of ice and dust" },
    { word: "cytoplasm", definition: "The material or protoplasm within a living cell, excluding the nucleus" },
    { word: "calculus", definition: "The branch of mathematics that deals with the finding and properties of derivatives and integrals" },
    { word: "caldera", definition: "A large volcanic crater, typically one formed by a major eruption" },
    { word: "calibration", definition: "The action or process of calibrating an instrument or experimental readings" },
    { word: "calorimeter", definition: "An apparatus for measuring the amount of heat involved in a chemical reaction" },
    { word: "cambrian", definition: "The first geological period of the Paleozoic Era" },
    { word: "capacitance", definition: "The ability of a system to store an electric charge" },
    { word: "capillary", definition: "Any of the fine branching blood vessels that form a network" },
    { word: "carapace", definition: "The hard upper shell of a turtle, crustacean, or arachnid" },
    { word: "catalysis", definition: "The acceleration of a chemical reaction by a catalyst" },
    { word: "cathode", definition: "The negatively charged electrode by which electrons enter an electrical device" },
    { word: "centrifuge", definition: "A machine with a rapidly rotating container that applies centrifugal force" },
    { word: "cerebrum", definition: "The principal and most anterior part of the brain in vertebrates" },
    { word: "chromatography", definition: "The separation of a mixture by passing it in solution or suspension through a medium" },
    { word: "circuitry", definition: "Electric circuits collectively" },
    { word: "coagulation", definition: "The action or process of a liquid, especially blood, changing to a solid or semi-solid state" },
    { word: "colloid", definition: "A mixture in which one substance of microscopically dispersed insoluble particles is suspended throughout another substance" },
    { word: "conduction", definition: "The process by which heat or electricity is directly transmitted through a substance" },
    { word: "conglomerate", definition: "A coarse-grained sedimentary rock composed of rounded fragments" },
    { word: "convection", definition: "The movement caused within a fluid by the tendency of hotter and therefore less dense material to rise" },
    { word: "cotyledon", definition: "An embryonic leaf in seed-bearing plants" },
    { word: "craton", definition: "A large, stable block of the earth's crust forming the nucleus of a continent" },
    { word: "cyclone", definition: "A system of winds rotating inward to an area of low atmospheric pressure" },
    { word: "cytology", definition: "The branch of biology concerned with the structure and function of plant and animal cells" },
    { word: "calorie", definition: "A unit of energy" },
    { word: "carbohydrate", definition: "Any of a large group of organic compounds occurring in foods and living tissues" },
    { word: "cation", definition: "A positively charged ion" },
    { word: "chloroplast", definition: "A plastid that contains chlorophyll and in which photosynthesis takes place" },
    { word: "cleavage", definition: "A sharp division or split" }

  ],
  D: [
    { word: "data", definition: "Information used for analysis" },
    { word: "density", definition: "Mass per unit volume" },
    { word: "digit", definition: "A single number from 0 to 9" },
    { word: "dna", definition: "Molecule that carries genetic instructions" },
    { word: "dynamics", definition: "The branch of mechanics concerned with motion" },
    { word: "doppler", definition: "The shift in frequency of a wave in relation to an observer" },
    { word: "diffraction", definition: "The bending of waves around small obstacles" },
    { word: "divergence", definition: "The process of separating or branching out" },
    { word: "decibel", definition: "A unit used to measure the intensity of a sound" },
    { word: "delta", definition: "A landform created by deposition of sediment at a river mouth" },
    { word: "dendrite", definition: "A short branched extension of a nerve cell" },
    { word: "diode", definition: "A semiconductor device with two terminals, allowing current mostly in one direction" },
    { word: "diptera", definition: "A large order of insects that comprises the two-winged or true flies" },
    { word: "dispersion", definition: "The separation of white light into colors, or any particle separation" },
    { word: "domain", definition: "The highest taxonomic rank of organisms" },
    { word: "decibel", definition: "A unit used to measure the intensity of a sound" },
    { word: "declination", definition: "The angular distance of a point north or south of the celestial equator" },
    { word: "decomposition", definition: "The state or process of rotting; decay" },
    { word: "dendrochronology", definition: "The science or technique of dating events, environmental change, and archaeological artifacts by using the characteristic patterns of annual growth rings in timber and tree trunks" },
    { word: "denitrification", definition: "The loss or removal of nitrogen or nitrogen compounds" },
    { word: "density", definition: "The degree of compactness of a substance" },
    { word: "deposition", definition: "The geological process in which sediments, soil and rocks are added to a landform or land mass" },
    { word: "desalination", definition: "The process of removing salt from seawater" },
    { word: "diatomic", definition: "Consisting of two atoms" },
    { word: "dichotomy", definition: "A division or contrast between two things that are or are represented as being opposed or entirely different" },
    { word: "diffraction", definition: "The process by which a beam of light or other system of waves is spread out as a result of passing through a narrow aperture" },
    { word: "dilution", definition: "The action of making a liquid more dilute" },
    { word: "diode", definition: "A semiconductor device with two terminals, typically allowing the flow of current in one direction only" },
    { word: "diploid", definition: "Containing two complete sets of chromosomes, one from each parent" },
    { word: "dispersion", definition: "The distinct phases of a mixture where one substance acts as the medium to hold another" },
    { word: "distillation", definition: "The action of purifying a liquid by a process of heating and cooling" },
    { word: "diurnal", definition: "Of or during the day" },
    { word: "divergence", definition: "The process or state of diverging" },
    { word: "dolomite", definition: "A translucent mineral consisting of a carbonate of calcium and magnesium" },
    { word: "doppler", definition: "An increase (or decrease) in the frequency of sound, light, or other waves as the source and observer move toward (or away from) each other" },
    { word: "ductility", definition: "The physical property of a material associated with the ability to be hammered thin or stretched into wire without breaking" },
    { word: "dynamics", definition: "The branch of mechanics concerned with the motion of bodies under the action of forces" },
    { word: "dynamo", definition: "A machine for converting mechanical energy into electrical energy; a generator" },
    { word: "deciduous", definition: "Shedding its leaves annually" },
    { word: "derivative", definition: "The rate of change of a function with respect to a variable" },
    { word: "diffusion", definition: "The spreading of something more widely" },
    { word: "distal", definition: "Situated away from the center of the body" },
    { word: "dominant", definition: "A trait that will appear in the offspring if one of the parents contributes it" }

  ],
  E: [
    { word: "energy", definition: "Ability to do work" },
    { word: "element", definition: "A pure substance made of one type of atom" },
    { word: "engine", definition: "A machine that converts energy into motion" },
    { word: "electron", definition: "A subatomic particle with a negative charge" },
    { word: "ecology", definition: "The study of interactions among organisms and their environment" },
    { word: "entropy", definition: "A measure of the disorder or randomness in a closed system" },
    { word: "ecosystem", definition: "A biological community of interacting organisms" },
    { word: "eclipse", definition: "The obscuring of light from one celestial body by another" },
    { word: "earthquake", definition: "A sudden and violent shaking of the ground" },
    { word: "echolocation", definition: "The location of objects by reflected sound, used by animals" },
    { word: "elasticity", definition: "The ability of an object to resume its normal shape after being stretched" },
    { word: "electrolyte", definition: "A liquid or gel that contains ions and can be decomposed by electrolysis" },
    { word: "embryo", definition: "An unborn or unhatched offspring in the process of development" },
    { word: "enzyme", definition: "A substance produced by a living organism that acts as a catalyst" },
    { word: "epicenter", definition: "The point on the earth's surface vertically above the focus of an earthquake" },
    { word: "eccentricity", definition: "Deviation of a curve or orbit from circularity" },
    { word: "eclipse", definition: "An obscuring of the light from one celestial body by the passage of another" },
    { word: "ecology", definition: "The branch of biology that deals with the relations of organisms to one another and to their physical surroundings" },
    { word: "ecosystem", definition: "A biological community of interacting organisms and their physical environment" },
    { word: "ectoderm", definition: "The outermost layer of cells or tissue of an embryo in early development" },
    { word: "effusion", definition: "An instance of giving off something such as a liquid, light, or smell" },
    { word: "elasticity", definition: "The ability of an object or material to resume its normal shape after being stretched or compressed" },
    { word: "electrode", definition: "A conductor through which electricity enters or leaves an object, substance, or region" },
    { word: "electrolysis", definition: "Chemical decomposition produced by passing an electric current through a liquid or solution containing ions" },
    { word: "electrolyte", definition: "A liquid or gel that contains ions and can be decomposed by electrolysis" },
    { word: "electromagnetism", definition: "The interaction of electric currents or fields and magnetic fields" },
    { word: "electron", definition: "A stable subatomic particle with a charge of negative electricity" },
    { word: "element", definition: "Each of more than one hundred substances that cannot be chemically interconverted or broken down into simpler substances" },
    { word: "embryology", definition: "The branch of biology and medicine concerned with the study of embryos and their development" },
    { word: "emission", definition: "The production and discharge of something, especially gas or radiation" },
    { word: "emulsion", definition: "A fine dispersion of minute droplets of one liquid in another in which it is not soluble or miscible" },
    { word: "endemic", definition: "Regularly found among particular people or in a certain area" },
    { word: "endocrine", definition: "Relating to or denoting glands which secrete hormones or other products directly into the blood" },
    { word: "endoderm", definition: "The innermost layer of cells or tissue of an embryo in early development" },
    { word: "endothermic", definition: "Requiring the absorption of heat" },
    { word: "entomology", definition: "The branch of zoology concerned with the study of insects" },
    { word: "entropy", definition: "A thermodynamic quantity representing the unavailability of a system's thermal energy for conversion into mechanical work" },
    { word: "epicenter", definition: "The point on the earth's surface vertically above the focus of an earthquake" },
    { word: "epiglottis", definition: "A flap of cartilage at the root of the tongue, which is depressed during swallowing to cover the opening of the windpipe" },
    { word: "epiphyte", definition: "A plant that grows on another plant but is not parasitic" },
    { word: "equilibrium", definition: "A state in which opposing forces or influences are balanced" },
    { word: "erosion", definition: "The process of eroding or being eroded by wind, water, or other natural agents" },
    { word: "estuary", definition: "The tidal mouth of a large river, where the tide meets the stream" },
    { word: "ethnology", definition: "The study of the characteristics of various peoples and the differences and relationships between them" },
    { word: "ethology", definition: "The science of animal behavior" },
    { word: "eukaryote", definition: "An organism consisting of a cell or cells in which the genetic material is DNA in the form of chromosomes contained within a distinct nucleus" },
    { word: "evaporation", definition: "The process of turning from liquid into vapor" },
    { word: "exoskeleton", definition: "A rigid external covering for the body in some invertebrate animals" },
    { word: "exothermic", definition: "Accompanied by the release of heat" },
    { word: "efferent", definition: "Conducted or conducting outward or away from something" },
    { word: "epidermis", definition: "The outer layer of cells covering an organism" }

  ],
  F: [
    { word: "force", definition: "A push or pull on an object" },
    { word: "field", definition: "An area influenced by a force" },
    { word: "frame", definition: "A structure that supports something" },
    { word: "friction", definition: "The resistance encountered when moving over a surface" },
    { word: "fossil", definition: "Remains or impressions of prehistoric plants or animals" },
    { word: "faraday", definition: "Scientific name associated with electromagnetic induction" },
    { word: "fission", definition: "The act of dividing or splitting an atomic nucleus" },
    { word: "flora", definition: "The plants of a particular region or habitat" },
    { word: "frequency", definition: "The rate at which a vibration occurs that constitutes a wave" },
    { word: "fahrenheit", definition: "A scale of temperature" },
    { word: "fauna", definition: "The animals of a particular region, habitat, or geological period" },
    { word: "fermentation", definition: "The chemical breakdown of a substance by bacteria, yeasts, or other microorganisms" },
    { word: "filament", definition: "A slender threadlike object or fiber, found in bulbs or anatomy" },
    { word: "fluid", definition: "A substance that has no fixed shape and yields easily to external pressure" },
    { word: "fluorescence", definition: "The visible or invisible radiation emitted by certain substances as a result of incident radiation" },
    { word: "fault", definition: "An extended break in a rock formation" },
    { word: "fertilization", definition: "The action or process of fertilizing an egg" },
    { word: "focal", definition: "Relating to the center or main point of interest" },
    { word: "foodweb", definition: "A system of interlocking and interdependent food chains" },
    { word: "fulcrum", definition: "The point on which a lever rests or is supported" },
    { word: "fusion", definition: "The process or result of joining two or more things together" }
  ],
  G: [
    { word: "gravity", definition: "The force that attracts bodies toward the center of the earth" },
    { word: "genetics", definition: "The study of heredity and inherited characteristics" },
    { word: "galaxy", definition: "A system of millions or billions of stars" },
    { word: "geometry", definition: "The branch of mathematics concerned with shape, size, and space" },
    { word: "geology", definition: "The science deals with the earth's physical structure and substance" },
    { word: "gamete", definition: "A mature haploid male or female germ cell" },
    { word: "gluon", definition: "A subatomic particle that binds quarks together" },
    { word: "genotype", definition: "The genetic constitution of an individual organism" },
    { word: "galvanometer", definition: "An instrument for detecting and measuring small electric currents" },
    { word: "gamma", definition: "High-frequency electromagnetic radiation" },
    { word: "ganglion", definition: "A structure containing a number of nerve cell bodies" },
    { word: "gastropod", definition: "A mollusk of the large class Gastropoda, such as a snail" },
    { word: "generator", definition: "A dynamo or similar machine for converting mechanical energy into electricity" },
    { word: "geophysics", definition: "The physics of the earth and its environment in space" },
    { word: "glacier", definition: "A slowly moving mass or river of ice formed by the accumulation of snow" },
    { word: "geothermal", definition: "Relating to or produced by the internal heat of the earth" },
    { word: "germination", definition: "The process by which a plant grows from a seed" },
    { word: "gland", definition: "An organ in the human or animal body which secretes particular chemical substances" },
    { word: "greenhouse", definition: "A glass building in which plants are grown" },
    { word: "gymnosperm", definition: "A plant that has seeds unprotected by an ovary or fruit" }
  ],
  H: [
    { word: "hypothesis", definition: "A proposed explanation made on the basis of limited evidence" },
    { word: "habitat", definition: "The natural home or environment of an organism" },
    { word: "hardware", definition: "The physical components of a computer system" },
    { word: "hormone", definition: "Chemical messengers traveling in the blood" },
    { word: "helium", definition: "A light, colorless gas often used in balloons" },
    { word: "hubble", definition: "Scientific name associated with the expanding universe law" },
    { word: "homeostasis", definition: "The tendency toward a relatively stable biological equilibrium" },
    { word: "halide", definition: "A binary compound of a halogen with another element" },
    { word: "half-life", definition: "The time taken for the radioactivity of a specified isotope to fall to half its original value" },
    { word: "halogen", definition: "Any of the elements fluorine, chlorine, bromine, iodine, and astatine" },
    { word: "haploid", definition: "Having a single set of unpaired chromosomes" },
    { word: "hertz", definition: "The SI unit of frequency, equal to one cycle per second" },
    { word: "histology", definition: "The study of the microscopic structure of tissues" },
    { word: "hologram", definition: "A three-dimensional image formed by the interference of light beams" },
    { word: "humidity", definition: "A quantity representing the amount of water vapor in the atmosphere" },
    { word: "hardwood", definition: "The wood from a broadleaved tree" },
    { word: "heredity", definition: "The passing on of physical or mental characteristics genetically" },
    { word: "heterotroph", definition: "An organism deriving its nutritional requirements from complex organic substances" },
    { word: "hybrid", definition: "The offspring of two plants or animals of different species or varieties" }
  ],
  I: [
    { word: "inertia", definition: "A property of matter to resist an accelerating force" },
    { word: "ion", definition: "An atom or molecule with a net electric charge" },
    { word: "isotope", definition: "Forms of the same element with different neutron numbers" },
    { word: "immunology", definition: "The study of the immune system" },
    { word: "integer", definition: "A whole number, not a fraction" },
    { word: "igneous", definition: "Rock formed through the cooling and solidification of magma" },
    { word: "insulin", definition: "A hormone produced by the pancreas regulating glucose" },
    { word: "impulse", definition: "A force acting briefly on a body and producing a finite change of momentum" },
    { word: "impedance", definition: "The effective resistance of an electric circuit" },
    { word: "indicator", definition: "A compound that changes color at a specific pH" },
    { word: "infection", definition: "The invasion and multiplication of microorganisms in body tissues" },
    { word: "infrared", definition: "Electromagnetic radiation with wavelengths longer than visible light" },
    { word: "inhibitor", definition: "A substance that delays, slows, or prevents a chemical reaction" },
    { word: "invertebrate", definition: "An animal lacking a backbone" },
    { word: "ionosphere", definition: "The layer of the earth's atmosphere that contains a high concentration of ions" },
    { word: "incisor", definition: "A narrow-edged tooth at the front of the mouth" },
    { word: "inference", definition: "A conclusion reached on the basis of evidence and reasoning" },
    { word: "insect", definition: "A small arthropod animal that has six legs" },
    { word: "insulator", definition: "A substance which does not readily allow the passage of heat or sound" }
  ],
  J: [
    { word: "joule", definition: "The SI unit of work or energy" },
    { word: "jupiter", definition: "The largest planet in the solar system" },
    { word: "joint", definition: "A point at which parts of an artificial structure are joined" },
    { word: "jet", definition: "A rapid stream of liquid or gas forced out of a small opening" },
    { word: "java", definition: "A high-level, class-based, object-oriented programming language" },
    { word: "jurassic", definition: "A geologic period known for dinosaurs" },
    { word: "jaundice", definition: "Medical condition with yellowing of the skin" },
    { word: "juniper", definition: "An evergreen shrub or small tree" },
    { word: "jungle", definition: "An area of land overgrown with dense forest and tangled vegetation" },
    { word: "junction", definition: "A region of transition in a semiconductor" },
    { word: "juvenile", definition: "A young, immature organism" },
    { word: "jerboa", definition: "A desert rodent known for long hind legs and jumping" },
    { word: "jetstream", definition: "A narrow, variable band of very strong, predominantly westerly air currents" },
    { word: "jugular", definition: "Relating to the neck or throat, especially veins" },
    { word: "juxtaposition", definition: "The fact of two things being seen or placed close together with contrasting effect" }
  ],
  K: [
    { word: "kinetics", definition: "The study of rates of chemical processes" },
    { word: "kelvin", definition: "The SI base unit of thermodynamic temperature" },
    { word: "kingdom", definition: "A taxonomic category of the highest rank" },
    { word: "keratin", definition: "A fibrous protein forming the main structural constituent of hair/feathers" },
    { word: "kinematics", definition: "The branch of mechanics studying motion without forces" },
    { word: "krypton", definition: "A chemical element, a colorless noble gas" },
    { word: "kinase", definition: "An enzyme that catalyzes the transfer of phosphate groups" },
    { word: "kelp", definition: "Large brown seaweed forming underwater forests" },
    { word: "karst", definition: "Landscape underlain by limestone which has been eroded by dissolution" },
    { word: "karyotype", definition: "The number and visual appearance of the chromosomes in the cell nuclei" },
    { word: "keyboard", definition: "A panel of keys that operate a computer or typewriter" },
    { word: "kilobyte", definition: "A unit of memory or data equal to 1,024 bytes" },
    { word: "kilojoule", definition: "1,000 joules, especially as a measure of energy value" },
    { word: "kinesis", definition: "Undirected movement of a cell, organism, or part in response to a stimulus" },
    { word: "knot", definition: "A unit of speed equivalent to one nautical mile per hour" },
    { word: "kilogram", definition: "The SI unit of mass" }
  ],
  L: [
    { word: "lithosphere", definition: "The rigid outer part of the earth" },
    { word: "laser", definition: "A device producing a narrow beam of concentrated light" },
    { word: "logic", definition: "Reasoning conducted according to strict principles of validity" },
    { word: "lipid", definition: "Fatty acids or their derivatives insoluble in water" },
    { word: "lunar", definition: "Relating to the moon" },
    { word: "leukocyte", definition: "A colorless cell that circulates in the blood" },
    { word: "lattice", definition: "A regular repeated three-dimensional arrangement of atoms" },
    { word: "larva", definition: "The active immature form of an insect" },
    { word: "latitude", definition: "The angular distance of a place north or south of the earth's equator" },
    { word: "lava", definition: "Hot molten or semifluid rock erupted from a volcano" },
    { word: "lens", definition: "A piece of glass or transparent material with curved sides for concentrating light" },
    { word: "leverage", definition: "The exertion of force by means of a lever" },
    { word: "ligament", definition: "A short band of tough, flexible, fibrous connective tissue" },
    { word: "longitude", definition: "The angular distance of a place east or west of the meridian" },
    { word: "luminosity", definition: "The intrinsic brightness of a celestial object" },
    { word: "latent", definition: "Existing but not yet developed or manifest" },
    { word: "liquid", definition: "A substance that flows freely but is of constant volume" },
    { word: "lysosome", definition: "An organelle in the cytoplasm of eukaryotic cells containing degradative enzymes" }
  ],
  M: [
    { word: "molecule", definition: "A group of atoms bonded together" },
    { word: "mass", definition: "A coherent body of matter with no definite shape" },
    { word: "momentum", definition: "The quantity of motion of a moving body" },
    { word: "mutation", definition: "A change in the DNA sequence" },
    { word: "magnetism", definition: "Physical phenomena arising from the force between magnets" },
    { word: "meiosis", definition: "Cell division that results in four daughter cells" },
    { word: "mitosis", definition: "Cell division that results in two identical daughter cells" },
    { word: "magma", definition: "Hot fluid or semifluid material below the earth's crust" },
    { word: "macrocycle", definition: "A cyclic macromolecule or a macromolecular cyclic portion" },
    { word: "mammal", definition: "A warm-blooded vertebrate animal of a class that is distinguished by the possession of hair" },
    { word: "mantle", definition: "The region of the interior of the Earth between the core and the crust" },
    { word: "matrix", definition: "An environment or material in which something develops" },
    { word: "metabolism", definition: "The chemical processes that occur within a living organism in order to maintain life" },
    { word: "meteor", definition: "A small body of matter from outer space that enters the earth's atmosphere" },
    { word: "microbiology", definition: "The branch of science that deals with microorganisms" },
    { word: "machine", definition: "An apparatus using or applying mechanical power" },
    { word: "melting", definition: "Make or become liquified by heating" },
    { word: "meniscus", definition: "The curved upper surface of a liquid in a tube" },
    { word: "metal", definition: "A solid material that is typically hard, shiny, malleable, fusible, and ductile" }
  ],
  N: [
    { word: "nucleus", definition: "The positively charged central core of an atom" },
    { word: "neuron", definition: "A specialized cell transmitting nerve impulses" },
    { word: "nebula", definition: "A cloud of gas and dust in outer space" },
    { word: "neutron", definition: "A subatomic particle without an electric charge" },
    { word: "network", definition: "A group or system of interconnected people or things" },
    { word: "newton", definition: "The SI unit of force" },
    { word: "nematode", definition: "A worm of the large phylum Nematoda" },
    { word: "niche", definition: "The role and position a species has in its environment" },
    { word: "nanotechnology", definition: "The branch of technology that deals with dimensions and tolerances of less than 100 nanometers" },
    { word: "narcolepsy", definition: "A condition characterized by an extreme tendency to fall asleep" },
    { word: "neon", definition: "An inert gaseous element occurring in trace amounts in the atmosphere" },
    { word: "nephritis", definition: "Inflammation of the kidneys" },
    { word: "neurology", definition: "The branch of medicine or biology that deals with the anatomy, functions, and organic disorders of nerves" },
    { word: "node", definition: "A point in a network or diagram at which lines or pathways intersect or branch" },
    { word: "nucleolus", definition: "A small dense spherical structure in the nucleus of a cell during interphase" },
    { word: "nekton", definition: "Aquatic animals that are able to swim and move independently of water currents" },
    { word: "nitrogen", definition: "A colorless, odorless unreactive gas that forms about 78 percent of the earth's atmosphere" },
    { word: "noble", definition: "Inert and unreactive gas" },
    { word: "nonmetal", definition: "An element or substance that is not a metal" }
  ],
  O: [
    { word: "osmosis", definition: "Solvent molecules passing through a semipermeable membrane" },
    { word: "orbit", definition: "The curved path of a celestial object or spacecraft" },
    { word: "oxygen", definition: "A chemical element that constitutes 21 percent of the atmosphere" },
    { word: "optics", definition: "The scientific study of sight and the behavior of light" },
    { word: "organism", definition: "An individual animal, plant, or single-celled life form" },
    { word: "ohm", definition: "The SI unit of electrical resistance" },
    { word: "ozone", definition: "A highly reactive gas composed of three oxygen atoms" },
    { word: "organelle", definition: "Any of a number of organized or specialized structures within a living cell" },
    { word: "observatory", definition: "A room or building housing an astronomical telescope or other scientific equipment" },
    { word: "obsidian", definition: "A hard, dark, glasslike volcanic rock formed by the rapid solidification of lava without crystallization" },
    { word: "oceanography", definition: "The branch of science that deals with the physical and biological properties and phenomena of the sea" },
    { word: "omnivore", definition: "An animal or person that eats food of both plant and animal origin" },
    { word: "optic", definition: "Relating to the eye or vision" },
    { word: "organ", definition: "A part of an organism that is typically self-contained and has a specific vital function" },
    { word: "oscillation", definition: "Movement back and forth at a regular speed" },
    { word: "ovary", definition: "A female reproductive organ in which ova or eggs are produced" },
    { word: "ovule", definition: "The part of the ovary of seed plants that contains the female germ cell" },
    { word: "oxidation", definition: "The process or result of oxidizing or being oxidized" }
  ],
  P: [
    { word: "physics", definition: "The branch of science concerned with the nature and properties of matter and energy" },
    { word: "photon", definition: "A particle representing a quantum of light" },
    { word: "planet", definition: "A celestial body moving in an elliptical orbit around a star" },
    { word: "protein", definition: "Nitrogenous organic compounds essential for all living organisms" },
    { word: "pathogen", definition: "A bacterium, virus, or other microorganism that can cause disease" },
    { word: "pasteur", definition: "Scientific name associated with germ theory" },
    { word: "plasma", definition: "An ionized gas consisting of positive ions and free electrons" },
    { word: "pulsar", definition: "A highly magnetized rotating neutron star" },
    { word: "paleontology", definition: "The branch of science concerned with fossil animals and plants" },
    { word: "pancreas", definition: "A large gland behind the stomach that secretes digestive enzymes" },
    { word: "parallax", definition: "The effect whereby the position or direction of an object appears to differ when viewed from different positions" },
    { word: "parasitism", definition: "The practice of living as a parasite in or on another organism" },
    { word: "particle", definition: "A minute portion of matter" },
    { word: "pasteurization", definition: "The partial sterilization of a product to make it safe for consumption" },
    { word: "pendulum", definition: "A weight hung from a fixed point so that it can swing freely backward and forward" },
    { word: "parallel", definition: "Side by side and having the same distance continuously between them" },
    { word: "peptide", definition: "A short chain of amino acids" },
    { word: "perihelion", definition: "The point in the orbit of a planet, asteroid, or comet at which it is closest to the sun" },
    { word: "pharynx", definition: "The membrane-lined cavity behind the nose and mouth" },
    { word: "phase", definition: "A distinct period or stage in a process of change or forming part of something's development" },
    { word: "phenotype", definition: "The set of observable characteristics of an individual" },
    { word: "plate", definition: "Each of the several rigid pieces of the earth's lithosphere" },
    { word: "pollen", definition: "A fine powdery substance consisting of microscopic grains" },
    { word: "polymer", definition: "A substance that has a molecular structure consisting chiefly or entirely of a large number of similar units" },
    { word: "population", definition: "All the inhabitants of a particular town, area, or country" },
    { word: "potential", definition: "Latent qualities or abilities that may be developed" },
    { word: "precipitate", definition: "Cause to happen suddenly, unexpectedly, or prematurely" },
    { word: "predator", definition: "An animal that naturally preys on others" },
    { word: "pressure", definition: "The continuous physical force exerted on or against an object" },
    { word: "prey", definition: "An animal that is hunted and killed by another for food" },
    { word: "producer", definition: "An organism, either a green plant or bacterium, which is part of the first level of a food chain" },
    { word: "proton", definition: "A stable subatomic particle occurring in all atomic nuclei, with a positive electric charge" },
    { word: "protozoa", definition: "A phylum or group of phyla that comprises the single-celled microscopic animals" },
    { word: "pulley", definition: "A wheel with a grooved rim around which a cord passes" }
  ],
  Q: [
    { word: "quantum", definition: "A discrete quantity of energy" },
    { word: "quark", definition: "Any of a number of subatomic particles carrying a fractional electric charge" },
    { word: "quadrant", definition: "Each of four parts of a plane, sphere, space, or body divided by two lines at right angles" },
    { word: "quotient", definition: "A result obtained by dividing one quantity by another" },
    { word: "quasar", definition: "A massive and extremely remote celestial object emitting large amounts of energy" },
    { word: "quartz", definition: "A hard white or colorless mineral consisting of silicon dioxide" },
    { word: "quarantine", definition: "A state of enforced isolation" },
    { word: "qubit", definition: "The basic unit of quantum information" },
    { word: "quadruped", definition: "An animal which has four feet" },
    { word: "qualitative", definition: "Relating to, measuring, or measured by the quality of something rather than its quantity" },
    { word: "quantitative", definition: "Relating to, measuring, or measured by the quantity of something rather than its quality" },
    { word: "quantize", definition: "Apply quantum theory to restrict the number of possible values of a quantity" },
    { word: "quart", definition: "A unit of liquid capacity equal to a quarter of a gallon" },
    { word: "quarry", definition: "A place, typically a large, deep pit, from which stone or other materials are extracted" },
    { word: "quiescent", definition: "In a state or period of inactivity or dormancy" }
  ],
  R: [
    { word: "radiation", definition: "The emission of energy as electromagnetic waves" },
    { word: "robot", definition: "A machine resembling a human being and able to replicate certain movements" },
    { word: "rna", definition: "Ribonucleic acid, present in all living cells" },
    { word: "refraction", definition: "The fact or phenomenon of light being deflected in passing obliquely through a medium" },
    { word: "rocket", definition: "A vehicle propelled by exhaust gas from a rocket engine" },
    { word: "ribosome", definition: "A minute particle consisting of RNA and associated proteins" },
    { word: "retina", definition: "A layer at the back of the eyeball containing cells sensitive to light" },
    { word: "reflection", definition: "The throwing back by a body or surface of light, heat, or sound" },
    { word: "radar", definition: "A system for detecting the presence, direction, distance, and speed of aircraft, ships, and other objects" },
    { word: "reactant", definition: "A substance that takes part in and undergoes change during a reaction" },
    { word: "receptor", definition: "An organ or cell able to respond to light, heat, or other external stimulus" },
    { word: "recessive", definition: "Relating to or denoting heritable characteristics controlled by genes that are expressed in offspring only when inherited from both parents" },
    { word: "rectification", definition: "The conversion of alternating current to direct current" },
    { word: "relativity", definition: "The dependence of various physical phenomena on relative motion of the observer and the observed objects" },
    { word: "resistor", definition: "A device having a designed resistance to the passage of an electric current" },
    { word: "reproduction", definition: "The sexual or asexual process by which organisms generate new individuals of the same kind" },
    { word: "reptile", definition: "A vertebrate animal of a class that includes snakes, lizards, crocodiles, turtles" },
    { word: "respiration", definition: "The action of breathing" },
    { word: "rotation", definition: "The action of rotating around an axis or center" }
  ],
  S: [
    { word: "science", definition: "The systematic study of the physical and natural world" },
    { word: "species", definition: "A group of living organisms consisting of similar individuals capable of exchanging genes" },
    { word: "software", definition: "The programs and other operating information used by a computer" },
    { word: "spectrum", definition: "A band of colors, as seen in a rainbow, produced by separation of the components of light" },
    { word: "symbiosis", definition: "Interaction between two different organisms living in close physical association" },
    { word: "supernova", definition: "A star that suddenly increases greatly in brightness because of a catastrophic explosion" },
    { word: "synapse", definition: "A junction between two nerve cells" },
    { word: "strain", definition: "A force tending to pull or stretch something to an extreme or damaging degree" },
    { word: "salinity", definition: "The dissolved salt content of a body of water" },
    { word: "satellite", definition: "An artificial body placed in orbit around the earth or moon or another planet" },
    { word: "sediment", definition: "Matter that settles to the bottom of a liquid" },
    { word: "seismograph", definition: "An instrument that measures and records details of earthquakes, such as force and duration" },
    { word: "skeleton", definition: "An internal or external framework of bone, cartilage, or other rigid material supporting or containing the body of an animal or plant" },
    { word: "solvent", definition: "Able to dissolve other substances" },
    { word: "static", definition: "Lacking in movement, action, or change" },
    { word: "series", definition: "A number of things, events, or people of a similar kind or related nature coming one after another" },
    { word: "solid", definition: "Firm and stable in shape" },
    { word: "solute", definition: "The minor component in a solution, dissolved in the solvent" },
    { word: "solution", definition: "A liquid mixture in which the minor component is uniformly distributed within the major component" },
    { word: "sperm", definition: "Male reproductive cell" },
    { word: "speed", definition: "The rate at which someone or something is able to move or operate" },
    { word: "spore", definition: "A minute, typically one-celled, reproductive unit capable of giving rise to a new individual" },
    { word: "stamen", definition: "The male fertilizing organ of a flower" },
    { word: "state", definition: "The particular condition that someone or something is in at a specific time" },
    { word: "stigma", definition: "The part of a pistil that receives the pollen during pollination" },
    { word: "stimulus", definition: "A thing or event that evokes a specific functional reaction in an organ or tissue" },
    { word: "stomata", definition: "Any of the minute pores in the epidermis of the leaf or stem of a plant" },
    { word: "stratosphere", definition: "The layer of the earth's atmosphere above the troposphere" },
    { word: "sublimation", definition: "The transition of a substance directly from the solid to the gas phase" }
  ],
  T: [
    { word: "taxonomy", definition: "The branch of science concerned with classification" },
    { word: "theorem", definition: "A general proposition not self-evident but proved by a chain of reasoning" },
    { word: "telescope", definition: "An optical instrument designed to make distant objects appear nearer" },
    { word: "temperature", definition: "The degree or intensity of heat present in a substance or object" },
    { word: "thermodynamics", definition: "The branch of physical science that deals with the relations between heat and other forms of energy" },
    { word: "tectonic", definition: "Relating to the structure of the earth's crust and the large-scale processes within it" },
    { word: "tundra", definition: "A vast, flat, treeless Arctic region" },
    { word: "transcription", definition: "The process by which the information in a strand of DNA is copied into a new molecule of mRNA" },
    { word: "tangent", definition: "A straight line or plane that touches a curve or curved surface at a point, but if extended does not cross it at that point" },
    { word: "taxidermy", definition: "The art of preparing, stuffing, and mounting the skins of animals" },
    { word: "tension", definition: "The state of being stretched tight" },
    { word: "theory", definition: "A supposition or a system of ideas intended to explain something" },
    { word: "thermal", definition: "Relating to heat" },
    { word: "torque", definition: "A twisting force that causes rotation" },
    { word: "troposphere", definition: "The lowest region of the atmosphere" },
    { word: "tissue", definition: "Any of the distinct types of material of which animals or plants are made" },
    { word: "topography", definition: "The arrangement of the natural and artificial physical features of an area" },
    { word: "tornado", definition: "A mobile, destructive vortex of violently rotating winds" },
    { word: "trait", definition: "A distinguishing quality or characteristic" },
    { word: "translation", definition: "The process of translating the sequence of a messenger RNA (mRNA) molecule to a sequence of amino acids" },
    { word: "transpiration", definition: "The exhalation of water vapor through the stomata" },
    { word: "trough", definition: "A long, narrow open receptacle, usually boxlike in shape" },
    { word: "tsunami", definition: "A long high sea wave caused by an earthquake, submarine landslide, or other disturbance" }
  ],
  U: [
    { word: "universe", definition: "All existing matter and space considered as a whole" },
    { word: "ultraviolet", definition: "Electromagnetic radiation with a wavelength from 10 nm to 400 nm" },
    { word: "uranium", definition: "A chemical element with the symbol U, a radioactive metal" },
    { word: "ultrasound", definition: "Sound or other vibrations having an ultrasonic frequency" },
    { word: "urethane", definition: "A synthetic crystalline compound used in the manufacture of plastics" },
    { word: "umbra", definition: "The fully shaded inner region of a shadow cast by an opaque object" },
    { word: "uracil", definition: "A compound found in living tissue as a constituent base of RNA" },
    { word: "urea", definition: "A colorless crystalline compound which is the main nitrogenous breakdown product of protein metabolism" },
    { word: "unicellular", definition: "Consisting of a single cell" },
    { word: "updraft", definition: "An upward current or draft of air" },
    { word: "uranus", definition: "The seventh planet from the sun with an axis of rotation highly tilted" },
    { word: "urethra", definition: "The duct by which urine is conveyed out of the body from the bladder" },
    { word: "uterus", definition: "The organ in the lower body of a woman or female mammal where offspring are conceived and in which they gestate before birth" },
    { word: "univalve", definition: "Having a shell consisting of a single piece" },
    { word: "ungulate", definition: "A hoofed mammal" }
  ],
  V: [
    { word: "velocity", definition: "The speed of something in a given direction" },
    { word: "vacuole", definition: "A space or vesicle within the cytoplasm of a cell" },
    { word: "vacuum", definition: "A space entirely devoid of matter" },
    { word: "variable", definition: "A data item that may take on more than one value during the runtime of a program" },
    { word: "vector", definition: "A quantity having direction as well as magnitude" },
    { word: "virus", definition: "An infective agent that typically consists of a nucleic acid molecule in a protein coat" },
    { word: "viscosity", definition: "The state of being thick, sticky, and semifluid in consistency" },
    { word: "voltage", definition: "An electromotive force or potential difference expressed in volts" },
    { word: "vaccine", definition: "A substance used to stimulate the production of antibodies and provide immunity against one or several diseases" },
    { word: "valence", definition: "The combining power of an element, especially as measured by the number of hydrogen atoms it can displace or combine with" },
    { word: "vapor", definition: "A substance diffused or suspended in the air, especially one normally liquid or solid" },
    { word: "vascular", definition: "Relating to, affecting, or consisting of a vessel or vessels, especially those which carry blood" },
    { word: "vein", definition: "Any of the tubes forming part of the blood circulation system of the body" },
    { word: "vertebrate", definition: "An animal of a large group distinguished by the possession of a backbone or spinal column" },
    { word: "volt", definition: "The SI unit of electromotive force" },
    { word: "ventricle", definition: "A hollow part or cavity in an organ" },
    { word: "volcano", definition: "A mountain or hill having a crater or vent through which lava, rock fragments, hot vapor, and gas are being or have been erupted" },
    { word: "volume", definition: "The amount of space that a substance or object occupies" }
  ],
  W: [
    { word: "wattage", definition: "A measure of electrical power expressed in watts" },
    { word: "wavelength", definition: "The distance between successive crests of a wave" },
    { word: "weather", definition: "The state of the atmosphere at a place and time" },
    { word: "weight", definition: "A body's relative mass or the quantity of matter contained by it" },
    { word: "web", definition: "A complex system of interconnected elements (e.g., World Wide Web)" },
    { word: "watt", definition: "The SI unit of power" },
    { word: "weber", definition: "The SI unit of magnetic flux" },
    { word: "waveform", definition: "The shape and form of a signal such as a wave moving in a physical medium" },
    { word: "wane", definition: "To decrease in vigor, power, or extent; become weaker" },
    { word: "wax", definition: "A sticky yellowish moldable substance secreted by honeybees, or referring to the moon increasing in apparent size" },
    { word: "weathering", definition: "The breaking down of rocks, soil, and minerals as well as wood and artificial materials through contact with the Earth's atmosphere" },
    { word: "wedge", definition: "A piece of wood, metal, or some other material having one thick end and tapering to a thin edge, that is driven between two objects or parts of an object to secure or separate them" },
    { word: "weed", definition: "A wild plant growing where it is not wanted and in competition with cultivated plants" },
    { word: "wind", definition: "The perceptible natural movement of the air, especially in the form of a current of air blowing from a particular direction" },
    { word: "whitefly", definition: "A minute homopteran insect that resembles a tiny white moth" },
    { word: "work", definition: "Activity involving mental or physical effort" }
  ],
  X: [
    { word: "x-ray", definition: "An electromagnetic wave of high energy and very short wavelength" },
    { word: "xenon", definition: "A chemical element, a heavy, colorless, and odorless noble gas" },
    { word: "xerophyte", definition: "A plant that needs very little water" },
    { word: "xylem", definition: "The vascular tissue in plants that conducts water and dissolved nutrients" },
    { word: "x-axis", definition: "The principal or horizontal axis of a system of coordinates" },
    { word: "xanthic", definition: "Yellowish in color" },
    { word: "xenolith", definition: "A piece of rock within an igneous mass which is not derived from the original magma" },
    { word: "xerography", definition: "A dry copying process in which black or colored powder adheres to parts of a surface" },
    { word: "x-chromosome", definition: "A sex chromosome, two of which are normally present in female cells" },
    { word: "xenobiology", definition: "The study of alien biology or biology of species not originating on Earth" },
    { word: "xerocole", definition: "An animal adapted to survival in the desert" },
    { word: "xanthophyll", definition: "A yellow or brown carotenoid plant pigment which causes the autumn colors of leaves" },
    { word: "x-linked", definition: "A trait controlled by a gene attached to an X sex chromosome" },
    { word: "xylitol", definition: "A sweet-tasting crystalline alcohol derived from xylose, present in some plant tissues" },
    { word: "xerarch", definition: "Originating in a dry habitat" }
  ],
  Y: [
    { word: "y-axis", definition: "The secondary or vertical axis of a system of coordinates" },
    { word: "yield", definition: "The amount of an agricultural or industrial product produced" },
    { word: "yttrium", definition: "A chemical element, a silvery-metallic transition metal" },
    { word: "yolk", definition: "The yellow part of an egg, containing nutrients" },
    { word: "year", definition: "The time taken by a planet to make one revolution around the sun" },
    { word: "yaw", definition: "Twist or oscillate about a vertical axis" },
    { word: "yeast", definition: "A microscopic fungus consisting of single oval cells" },
    { word: "yoctosecond", definition: "One septillionth of a second" },
    { word: "yardage", definition: "A distance or length measured in yards" },
    { word: "y-chromosome", definition: "A sex chromosome which is normally present only in male cells" },
    { word: "yoke", definition: "A wooden crosspiece that is fastened over the necks of two animals" },
    { word: "yellow", definition: "Of the color between green and orange in the spectrum" },
    { word: "yield-point", definition: "The point on a stress-strain curve that indicates the limit of elastic behavior" },
    { word: "yotta", definition: "A decimal unit prefix in the metric system denoting a factor of 10^24" },
    { word: "yawl", definition: "A two-masted fore-and-aft-rigged sailboat with the mizzenmast stepped far aft" }
  ],
  Z: [
    { word: "zoology", definition: "The scientific study of the behavior, structure, classification, and distribution of animals" },
    { word: "zinc", definition: "A chemical element, a slightly brittle metal at room temperature" },
    { word: "zygote", definition: "A diploid cell resulting from the fusion of two haploid gametes" },
    { word: "zenith", definition: "The time at which something is most powerful or successful" },
    { word: "zero", definition: "No quantity or number; naught" },
    { word: "zooplankton", definition: "Plankton consisting of small animals and the immature stages of larger animals" },
    { word: "z-axis", definition: "The third axis in a three-dimensional coordinate system" },
    { word: "zodiac", definition: "A belt of the heavens within about 8 degrees either side of the ecliptic" },
    { word: "zeolite", definition: "Any of a large group of minerals consisting of hydrated aluminosilicates" },
    { word: "zero-gravity", definition: "The state or condition of weightlessness" },
    { word: "zipper", definition: "A device consisting of two flexible strips of metal or plastic with interlocking projections" },
    { word: "zircon", definition: "A mineral occurring as prismatic crystals, typically brown but sometimes in translucent forms of gem quality" },
    { word: "zooid", definition: "An animal arising from another by budding or division, especially each of the individuals that make up a colonial organism" },
    { word: "zoraptera", definition: "An order of minute wingless insects" },
    { word: "zygomatic", definition: "Relating to the bony arch of the cheek" }
  ]
};

// =====================================================================
// Dictionary Logic (The Librarian)
// =====================================================================
// We built the library (wordBank) above, but now we need rules on how to 
// check out books! These functions act like the Librarian.

// Function: getRandomLetter
// If we want a completely random letter for a new level, we ask the Librarian.
function getRandomLetter() {
  // First, the Librarian looks down the hallway at all the drawers (A, B, C...)
  // Object.keys(wordBank) makes a list of all 26 drawer names.
  const letters = Object.keys(wordBank);
  
  // Math.random() rolls a microscopic die between 0.0 and 1.0. 
  // We multiply that by 26 (the number of letters) to pick a random drawer number.
  // Math.floor chops off the decimals (e.g., 25.99 becomes 25).
  const randomIndex = Math.floor(Math.random() * letters.length);
  
  // We return the letter written on that specific drawer.
  return letters[randomIndex];
}

// Function: getWordsByLetter
// If we want ALL the words inside a specific letter's drawer, we ask the Librarian.
function getWordsByLetter(letter) {
  // If we give a bad letter (or empty space), the Librarian hands us nothing ([]).
  if (!letter || typeof letter !== 'string') return [];
  
  // Sometimes users pass lowercase 'a' instead of 'A'. This fixes it.
  const upperLetter = letter.toUpperCase();
  
  // Reaches into the 'wordBank' cabinet, grabs the drawer (e.g., 'A'), and hands you everything inside.
  // If the drawer doesn't exist, it hands you nothing (|| []).
  return wordBank[upperLetter] || [];
}

// Function: getRoundWords
// We don't want to test the player on ALL 15 words in a drawer at once. 
// We just want a random handful of them (usually 12) for a specific round.
function getRoundWords(letter, limit = 12) {
  // First, we grab EVERY word in the drawer using our function above.
  const allWordsForLetter = getWordsByLetter(letter);
  if (!allWordsForLetter || allWordsForLetter.length === 0) {
    return []; // Drawer is empty!
  }
  
  // We make a photocopy of the drawer contents so we don't accidentally ruin the original library!
  const clonedWords = [...allWordsForLetter];
  
  // The 'Fisher-Yates Shuffle' is a famous trick in programming to perfectly shuffle a deck of cards.
  // Imagine taking the bottom card, picking a random spot in the deck, and swapping them. Over and over.
  for (let i = clonedWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Here we physically swap card 'i' with card 'j'
    [clonedWords[i], clonedWords[j]] = [clonedWords[j], clonedWords[i]];
  }
  
  // Now we need to grab the top 12 cards from the shuffled deck.
  // We use a 'Set' like a bouncer at a club. It checks to make sure we don't let 
  // the exact same word into our list twice by mistake!
  const distinctWords = [];
  const trackingSet = new Set();
  
  for (const obj of clonedWords) {
    // If the Set (bouncer) has NOT seen this word yet...
    if (!trackingSet.has(obj.word.toLowerCase())) {
      trackingSet.add(obj.word.toLowerCase()); // The bouncer remembers the word.
      distinctWords.push(obj); // We add the word to our final test list.
      
      // If we finally collected the amount we wanted (usually 12)... we stop looking!
      if (distinctWords.length === limit) {
        break;
      }
    }
  }

  // We return our perfectly shuffled, duplicate-free list of words!
  return distinctWords;
}

// =====================================================================
// Exporting
// =====================================================================
// This basically tells the browser: "Hey, make these library functions
// public so other files (like 03_stage1_word_selection.js) can use them!"
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    wordBank,
    getRandomLetter,
    getWordsByLetter,
    getRoundWords
  };
} else if (typeof window !== 'undefined') {
  window.STEMDictionary = {
    wordBank,
    getRandomLetter,
    getWordsByLetter,
    getRoundWords
  };
}

