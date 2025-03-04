import { Injectable } from '@nestjs/common';
import { UpdatePaymentDto } from '../../entities/dto/update-payment.dto';
import { CreatePaymentDto } from '../../entities/dto/create-payment.dto';

@Injectable()
export class PaymentService {
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
