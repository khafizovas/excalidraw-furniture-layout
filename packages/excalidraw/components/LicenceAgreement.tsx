import { Dialog } from "./Dialog";
import "./LicenceAgreementModal.scss";

interface LicenceAgreementProps {
  onCloseRequest: () => void;
}

interface LicenceAgreementModalProps {
  year: number;
}

export const LicenceAgreement = (props: LicenceAgreementProps) => {
  const { onCloseRequest } = props;

  const currentYear = new Date().getFullYear();

  return (
    <Dialog onCloseRequest={onCloseRequest} title={false} size="wide">
      <LicenceAgreementModal year={currentYear} />
    </Dialog>
  );
};

const LicenceAgreementModal = (props: LicenceAgreementModalProps) => {
  const { year } = props;

  return (
    <div className="LicenceAgreementModal">
      <div>Copyright {year} Excalidraw.com</div>
      <div>
        Разрешается бесплатно использовать данный программный продукт и
        связанное с ним программное обеспечение без ограничений, включая без
        ограничения права на использование, копирование, изменение, слияние,
        публикацию, распространение, сублицензирование и/или продажу копий
        программного продукта, также как и лицам, которым предоставляется данный
        программный продукт, при соблюдении следующих условий:
      </div>
      <div>
        Указанное выше уведомление об авторском праве и данные условия должны
        быть включены во все копии или значимые части данного Программного
        обеспечения.
      </div>
      <div>
        ДАННОЕ ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ
        КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНО ВЫРАЖЕННЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ
        ГАРАНТИИ ТОВАРНОЙ ПРИГОДНОСТИ, СООТВЕТСТВИЯ ПО ЕГО КОНКРЕТНОМУ
        НАЗНАЧЕНИЮ И ОТСУТСТВИЯ НАРУШЕНИЙ, НО НЕ ОГРАНИЧИВАЯСЬ ИМИ. НИ В КАКОМ
        СЛУЧАЕ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ПО КАКИМ-ЛИБО
        ИСКАМ, ЗА УЩЕРБ ИЛИ ПО ИНЫМ ТРЕБОВАНИЯМ, В ТОМ ЧИСЛЕ, ПРИ ДЕЙСТВИИ
        КОНТРАКТА, ДЕЛИКТЕ ИЛИ ИНОЙ СИТУАЦИИ, ВОЗНИКШИМ ИЗ-ЗА ИСПОЛЬЗОВАНИЯ
        ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ ИЛИ ИНЫХ ДЕЙСТВИЙ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ.
      </div>
    </div>
  );
};
