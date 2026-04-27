import { Injectable } from '@nestjs/common';
import { kategori_api } from '../common/axios/kategori-interceptor.axios';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';

// buat interface untuk data kategori
export interface Kategori {
  id: number;
  nama: string;
  nama_filter: string;
}

@Injectable()
export class KategoriService {
  // buat variabel untuk endpoint API Kategori
  private readonly api_url = 'http://localhost:3001/api/kategori';

  // fungsi untuk tambah data
  // create kategori (3001)
  async create(createKategoriDto: CreateKategoriDto): Promise<Kategori> {
    // return 'This action adds a new kategori';
    const response = await kategori_api.post<Kategori>('/', createKategoriDto);
    return response.data;
  }

  // fungsi untuk ambil data kategori
  // findAll kategori (3001)
  async findAll(): Promise<Kategori[]> {
    // return `This action returns all kategori`;
    const response = await kategori_api.get<Kategori[]>('/');

    return response.data;
  }

  async findOne(id: number): Promise<Kategori> {
    // return `This action returns a #${id} kategori`;
    // const response = await axios.get<Kategori>(`${this.api_url}/${id}`);
    const response = await kategori_api.get<Kategori>(`/${id}`);

    return response.data;
  }

  async update(
    id: number,
    updateKategoriDto: UpdateKategoriDto,
  ): Promise<Kategori> {
    // return `This action updates a #${id} kategori`;
    const response = await kategori_api.patch<Kategori>(
      `/${id}`,
      updateKategoriDto,
    );

    return response.data;
  }

  async remove(id: number): Promise<Kategori> {
    // return `This action removes a #${id} kategori`;
    const response = await kategori_api.delete<Kategori>(`/${id}`);

    return response.data;
  }
}
