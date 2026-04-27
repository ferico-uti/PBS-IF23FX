import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { notExist } from '../common/utils/not-exist.util';
import { PrismaService } from '../prisma.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { conflict } from '../common/utils/conflict.util';

@Injectable()
export class KategoriService {
  // buat constructor untuk prisma service
  constructor(private readonly prisma: PrismaService) {}

  // simpan data kategori
  async create(createKategoriDto: CreateKategoriDto) {
    // return 'This action adds a new kategori';

    // panggil fungsi conflict
    const nama_filter = await conflict(
      createKategoriDto.nama,
      this.prisma.kategori,
      process.env.FAILED_SAVE_MESSAGE!,
    );

    // jika nama kategori tidak ditemukan
    // simpan data kategori
    await this.prisma.kategori.create({
      data: {
        nama: createKategoriDto.nama,
        nama_filter: nama_filter,
      },
    });

    // tampilkan respon
    return {
      success: true,
      message: process.env.SUCCESS_SAVE_MESSAGE,
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  // tampilkan seluruh data kategori
  async findAll() {
    // return `This action returns all kategori`;

    // tampilkan data kategori
    const data = await this.prisma.kategori.findMany();
    // jika data kategori kosong (tidak ada)
    if (data.length === 0) {
      // throw new HttpException(
      //   {
      //     success: false,
      //     message: 'Data Kategori Tidak Ditemukan !',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //       total_data: data.length,
      //     },
      //   },
      //   HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException({
        success: false,
        message: 'Data Kategori Tidak Ditemukan !',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    // jika data kategori tidak kosong (tersedia)
    return {
      success: true,
      message: '',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data: data,
    };
  }

  // fungsi untuk detail data
  async findOne(id: number) {
    // return `This action returns a #${id} kategori`;

    try {
      // tampilkan data kategori berdasarkan id
      // const data = await this.prisma.kategori.findUnique({
      //   where: { id: id },
      // });

      // jika data kategori tidak ditemukan
      // if (!data) {
      //   throw new NotFoundException({
      //     success: false,
      //     message: 'Data Kategori Tidak Ditemukan !',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //     },
      //   });
      // }

      // panggil fungsi notExist
      const data = await notExist(id, this.prisma.kategori);

      // jika data kategori ditemukan
      return {
        success: true,
        message: '',
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Parameter/Slug ID Harus Angka !',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // fungsi untuk ubah data
  async update(id: number, updateKategoriDto: UpdateKategoriDto) {
    // return `This action updates a #${id} kategori`;

    try {
      // tampilkan data kategori berdasarkan id
      // const data = await this.prisma.kategori.findUnique({
      //   where: { id: id },
      // });

      // jika data kategori tidak ditemukan
      // if (!data) {
      //   throw new NotFoundException({
      //     success: false,
      //     message: 'Data Kategori Tidak Ditemukan !',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //     },
      //   });
      // }

      await notExist(id, this.prisma.kategori);

      // jika data kategori ditemukan
      // panggil fungsi conflict
      const nama_filter = await conflict(
        updateKategoriDto.nama ?? '',
        this.prisma.kategori,
        process.env.FAILED_UPDATE_MESSAGE ?? '',
        id,
      );

      // ubah data kategori berdasarkan id
      await this.prisma.kategori.update({
        where: { id: id },
        data: {
          nama: updateKategoriDto.nama,
          nama_filter: nama_filter,
        },
      });

      return {
        success: true,
        message: 'Data Kategori Berhasil Diubah',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // if (error instanceof NotFoundException) {
      //   throw error;
      // }

      // if (error instanceof ConflictException) {
      //   throw error;
      // }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Parameter/Slug ID Harus Angka !',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // fungsi untuk hapus data
  async remove(id: number) {
    // return `This action removes a #${id} kategori`;

    try {
      // tampilkan data kategori berdasarkan id
      // const data = await this.prisma.kategori.findUnique({
      //   where: { id: id },
      // });

      // jika data kategori tidak ditemukan
      // if (!data) {
      //   throw new NotFoundException({
      //     success: false,
      //     message: 'Data Kategori Tidak Ditemukan !',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //     },
      //   });
      // }

      // panggil fungsi notExist
      await notExist(id, this.prisma.kategori);

      // jika data kategori ditemukan
      // hapus data kategori berdasarkan id
      await this.prisma.kategori.delete({
        where: { id: id },
      });

      return {
        success: true,
        message: 'Data Kategori Berhasil Dihapus',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Parameter/Slug ID Harus Angka !',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}
