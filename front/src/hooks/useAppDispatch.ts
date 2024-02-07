import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';

// Создаю хук useAppDispatch, который возвращает useDispatch уже с типизацией AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
