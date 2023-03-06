import { Navigate,useRoutes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MemoDetailPage from './pages/MemoDetailPage'
import MemoEditPage from './pages/MemoEditPage'
import MemoManagerPage from './pages/MemoManagerPage'

const Route = () => {
  return useRoutes([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/:id',
    element: <MemoDetailPage/>
  },
  {
    path: '/:id/edit',
    element: <MemoEditPage/>
  },
  {
    path: '/manager',
    element: <MemoManagerPage/>
  },
  {
    path: '*',
    element: <Navigate to={"/"} replace/>
  },
])
}

export default Route