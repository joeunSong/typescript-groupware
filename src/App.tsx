// * basic
//  * install libraries
// * components
import Router from './routes/Index';
// * constants
// * apis
// * utils

const App = (props: any) => {
  const {} = props;

  return <Router />;
};

export default App;

/* <div className='w-full h-screen'>
<BrowserRouter>
  <div className='flex w-full h-full'>
    <SideBarLayout />
    <div className='flex flex-col w-full h-full'>
      <div className='flex w-full h-full'>
        <Routes>
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
    </div>
  </div>
</BrowserRouter>
</div> */
