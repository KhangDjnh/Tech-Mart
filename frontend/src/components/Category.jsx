import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Category() {
    const product = useSelector(state => state.products.data)
    const category = product?.map(e => (e.category)).flat().filter((value, index, self) => self.indexOf(value) === index) || []
    const getImgSrc = (idx) =>{
        switch(idx){
            case 0:
                return 'https://i.ebayimg.com/images/g/4fEAAOSw7B9huovz/s-l1600.webp'
            case 1:
                return 'https://th.bing.com/th/id/OIP.O9tp7tHdxxMLdSpLNDkQcQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7'
            case 2:
                return 'https://th.bing.com/th/id/OIP.QbEDZheTpCA435Zah2jGpAHaEo?rs=1&pid=ImgDetMain'
            case 3:
                return 'https://product.hstatic.net/200000722513/product/thumbchuot_a07680091d0547fca07a7bdb36d92b4e_8795f809a33b43b780c762d098169c15.png'
            case 4:
                return 'https://product.hstatic.net/200000420363/product/ban-phim-co-gaming-spartan-tc3218_e178f83dee794d999ac19dc0724be991_master.png'
            default:
                return 'https://th.bing.com/th/id/OIP.O9tp7tHdxxMLdSpLNDkQcQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7'

        }
    }
    return (
        <div className={' mt-20  '}>
            <h1 className={'text-2xl font-bold text-start mb-4'}>DANH MỤC</h1>
            <div className={'flex items-center gap-5'}>
                {
                    category.map((e, i) => (
                        <Link to={`/category/${e}`} key={i} className={'w-28 h-28 hover:outline hover:outline-1 hover:outline-black hover:scale-105  flex justify-center items-center flex-col '}>
                            <div className={'h-12 w-12 rounded-full mb-4'}>
                                <img
                                    src={`${getImgSrc(i)}`}
                                    alt="" className={''} />
                            </div>
                            <h1 className={'line-clamp-1'}>{e}</h1>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Category;