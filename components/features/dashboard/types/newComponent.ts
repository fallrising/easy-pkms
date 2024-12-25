import {Component, ComponentType} from '@/api/types/dashboard';

export interface NewComponent extends Omit<Component, 'id'> {
    type: ComponentType;
}