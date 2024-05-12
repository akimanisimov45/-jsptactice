import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const countAllProducts = async () => {
  const totalProducts = await prisma.stock.aggregate({
    _sum: {
      quantity: true,
    },
  });
  return totalProducts._sum.quantity || 0;
};

export const getProductsOnStock = async (uuid: string) => {
  const productsOnStock = await prisma.stock.findMany({
    where: {
      warehouseId: uuid,
    },
    include: {
      product: true,
    },
  });
  return productsOnStock;
};

export const countProduct = async (sku: string) => {
  const totalProductQuantity = await prisma.stock.aggregate({
    _sum: {
      quantity: true,
    },
    where: {
      product: {
        sku: sku,
      },
    },
  });
  return totalProductQuantity._sum.quantity || 0;
};

export const countProductOnStock = async (uuid: string, sku: string) => {
  const productQuantityOnStock = await prisma.stock.aggregate({
    _sum: {
      quantity: true,
    },
    where: {
      warehouseId: uuid,
      product: {
        sku: sku,
      },
    },
  });
  return productQuantityOnStock._sum.quantity || 0;
};

export const countProductByCategory = async (slug: string) => {
  const totalProductsByCategory = await prisma.product.count({
    where: {
      categories: {
        some: {
          slug: slug,
        },
      },
    },
  });
  return totalProductsByCategory;
};

export const countProductOnStockByCategory = async (uuid: string, slug: string) => {
  const totalProductsOnStockByCategory = await prisma.stock.count({
    where: {
      warehouseId: uuid,
      product: {
        categories: {
          some: {
            slug: slug,
          },
        },
      },
    },
  });
  return totalProductsOnStockByCategory;
};
