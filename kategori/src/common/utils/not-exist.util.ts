// buat fungsi untuk cek data kategori

import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

// (jika tidak ditemukan datanya)
export const notExist = async (
  id: number,
  prisma: PrismaService['kategori'],
) => {
  // tampilkan data kategori berdasarkan id
  const data = await prisma.findUnique({
    where: { id: id },
  });

  // jika data kategori tidak ditemukan
  if (!data) {
    throw new NotFoundException({
      success: false,
      message: 'Data Kategori Tidak Ditemukan !',
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  return data;
};

// export async function notExist(id, prisma) {

// }
