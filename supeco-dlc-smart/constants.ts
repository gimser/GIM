
import { ProductStatus } from './types';

export const STATUS_COLORS: { [key in ProductStatus]: string } = {
  [ProductStatus.Fresh]: 'bg-status-green',
  [ProductStatus.Soon]: 'bg-status-orange',
  [ProductStatus.Expired]: 'bg-status-red',
};

export const STATUS_TEXT_COLORS: { [key in ProductStatus]: string } = {
    [ProductStatus.Fresh]: 'text-status-green',
    [ProductStatus.Soon]: 'text-status-orange',
    [ProductStatus.Expired]: 'text-status-red',
  };

export const STATUS_BORDER_COLORS: { [key in ProductStatus]: string } = {
    [ProductStatus.Fresh]: 'border-status-green',
    [ProductStatus.Soon]: 'border-status-orange',
    [ProductStatus.Expired]: 'border-status-red',
};
