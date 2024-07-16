import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import configuration from './configuration'
import { FirebaseOptions } from 'firebase/app'

type Config = ReturnType<typeof configuration>

@Injectable()
export class ConfigService extends NestConfigService {
  getFirebaseConfig(): FirebaseOptions {
    return this.get<Config['firebase']>('firebase')
  }
}
