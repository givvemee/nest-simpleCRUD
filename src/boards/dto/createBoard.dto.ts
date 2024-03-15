import { IsNotEmpty } from 'class-validator';

// class interface 둘 다 활용 가능. class 는 런타임 때 활용이 가능, 파이프 사용에 유용한
export class CreateBoardDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
