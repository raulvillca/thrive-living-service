import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { PaymentMethodModule } from './modules/payment-method/payment-method.module';

@Module({
  exports: [PaymentModule, PaymentMethodModule],
})
export class PaymentCoreModule {}
