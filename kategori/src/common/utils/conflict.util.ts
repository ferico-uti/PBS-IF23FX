import { ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

// buat fungsi untuk cek duplikasi data kategori
export const conflict = async (
  nama: string,
  prisma: PrismaService['kategori'],
  message: string,
  id?: number,
) => {
  // buat variabel untuk filter nama
  const nama_filter = nama.trim().replace(/\s/g, '').toLowerCase();

  // cek apakah nama kategori sudah ada
  const exist = await prisma.findFirst({
    where: {
      // ternary operator
      // NOT: id ? { id: id } : undefined,
      nama_filter: nama_filter,
      // spread operator
      ...(id ? { NOT: { id: id } } : undefined),
    },
  });

  // jika nama kategori ditemukan
  if (exist) {
    // tampilkan respon
    throw new ConflictException({
      success: false,
      message: message,
      metadata: {
        status: HttpStatus.CONFLICT,
      },
    });
  }

  return nama_filter;
};
