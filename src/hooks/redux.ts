import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { TAppDispatchWithThunk, TRootState } from "../services/store";

export const useAppDispatch = () => useDispatch<TAppDispatchWithThunk>()
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector