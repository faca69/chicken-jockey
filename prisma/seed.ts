import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const companyNames = [
  "TechCorp Solutions",
  "Digital Innovations",
  "NextGen Systems",
  "CloudFirst Technologies",
  "DataStream Analytics",
  "CyberShield Security",
  "AgileWorks",
  "ScaleUp Dynamics",
  "CodeCraft Studios",
  "InnovateLab",
  "FutureForward Inc",
  "SmartByte Technologies",
  "QuantumLeap Solutions",
  "WebFlow Dynamics",
  "MobileTech Ventures",
  "ServerCore Systems",
  "DevOps Masters",
  "CloudNine Computing",
  "ByteForge Solutions",
  "TechStack Innovations",
  "DigitalCraft Labs",
  "CoreLogic Systems",
  "NetSphere Technologies",
  "CodeVault Solutions",
  "TechFlow Dynamics",
  "DataForge Analytics",
  "CyberCore Security",
  "AppStream Technologies",
  "CloudSync Solutions",
  "DevHub Innovations",
  "TechBridge Systems",
  "PixelCraft Studios",
  "DataFlow Technologies",
  "ServerMax Solutions",
  "WebCraft Innovations",
  "MobileDev Studios",
  "TechPro Solutions",
  "CloudBurst Technologies",
  "CodeStream Dynamics",
  "NetCore Systems",
  "DigitalEdge Labs",
  "TechForge Solutions",
  "DataSync Technologies",
  "CyberFlow Security",
  "AppCore Innovations",
  "CloudTech Dynamics",
  "DevStream Solutions",
  "TechLab Systems",
  "PixelFlow Studios",
  "DataCore Analytics",
];

const industries = [
  "Technology",
  "Software Development",
  "Cybersecurity",
  "Cloud Computing",
  "Data Analytics",
  "Artificial Intelligence",
  "Machine Learning",
  "Web Development",
  "Mobile App Development",
  "DevOps",
  "Blockchain",
  "IoT Solutions",
  "E-commerce",
  "SaaS",
  "Fintech",
  "Healthtech",
  "Edtech",
  "Gaming",
  "Digital Marketing",
  "Consulting",
];

const emailDomains = [
  "@techcorp.com",
  "@digitalinc.com",
  "@nextgen.io",
  "@cloudfirst.net",
  "@datastream.com",
  "@cybershield.io",
  "@agileworks.net",
  "@scaleup.com",
  "@codecraft.dev",
  "@innovatelab.io",
  "@futureforward.com",
  "@smartbyte.tech",
];

async function main() {
  console.log("Start seeding companies...");

  for (let i = 0; i < 50; i++) {
    const companyName = companyNames[i] || `Company ${i + 1}`;
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const emailDomain =
      emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const email = `contact${i + 1}${emailDomain}`;

    await prisma.user.create({
      data: {
        name: companyName,
        email: email,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "COMPANY",
        company: {
          create: {
            companyName: companyName,
            industry: industry,
          },
        },
      },
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
