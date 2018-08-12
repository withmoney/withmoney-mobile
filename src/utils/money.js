import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

// if (typeof window === 'undefined') {
//   global.Intl = Intl
// }

// export const toFloat = number => parseFloat(number.replace(',', '.'), 10)

export const floatToReal = (float) => {
  const float2Decimal = Math.round(float * 100) / 100;
  return Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  }).format(float2Decimal).replace('R$', 'R$ ');
};

export default floatToReal;
