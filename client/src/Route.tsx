import { Navigate,useRoutes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MemoDetailPage from './pages/detail/MemoDetailPage'
import MemoEditPage from './pages/edit/MemoEditPage'
import MemoManagerPage from './pages/manager/MemoManagerPage'

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