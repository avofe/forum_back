import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "Компьютеры", slug: "computers" },
    }),
    prisma.category.create({
      data: { name: "Ноутбуки", slug: "laptops" },
    }),
    prisma.category.create({
      data: { name: "Принтеры и МФУ", slug: "printers" },
    }),
    prisma.category.create({
      data: { name: "Периферия", slug: "peripherals" },
    }),
    prisma.category.create({
      data: { name: "Комплектующие", slug: "components" },
    }),
  ]);

  console.log(`Created ${categories.length} categories`);

  const products = [
    {
      name: "Персональный компьютер",
      brand: "TechLab",
      model: "TL-3000",
      price: 45999,
      stock: 10,
      description: "Мощный ПК для офисных задач и работы с графикой",
      imageUrl: "/uploads/products/pc.png",
      categoryId: categories[0].id,
    },
    {
      name: "Игровой компьютер",
      brand: "TechLab",
      model: "TL-Gamer X1",
      price: 89999,
      stock: 5,
      description: "Производительный игровой ПК с видеокартой RTX 4060",
      imageUrl: "/uploads/products/pc2.png",
      categoryId: categories[0].id,
    },
    {
      name: "Ноутбук офисный",
      brand: "EasyBook",
      model: "EB-15 Pro",
      price: 34999,
      stock: 15,
      description: "Лёгкий ноутбук для работы и учёбы",
      imageUrl: "/uploads/products/notebook.png",
      categoryId: categories[1].id,
    },
    {
      name: "Принтер лазерный",
      brand: "PrintMaster",
      model: "PM-200",
      price: 12999,
      stock: 8,
      description: "Чёрно-белый лазерный принтер для офиса",
      imageUrl: "/uploads/products/printer.png",
      categoryId: categories[2].id,
    },
    {
      name: "Клавиатура механическая",
      brand: "KeyCraft",
      model: "KC-87 RGB",
      price: 4999,
      stock: 20,
      description: "Механическая клавиатура с подсветкой",
      imageUrl: "/uploads/products/keyboard.png",
      categoryId: categories[3].id,
    },
    {
      name: "Кабель HDMI",
      brand: "ConnectPro",
      model: "HDMI-2.1",
      price: 799,
      stock: 50,
      description: "Кабель HDMI 2.1, 2 метра",
      imageUrl: "/uploads/products/cabel.png",
      categoryId: categories[3].id,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Created ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
