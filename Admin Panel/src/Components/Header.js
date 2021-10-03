import { Fragment, useState, useContext } from 'react'
import { Disclosure } from '@headlessui/react'
import { Button} from 'antd';
import { MenuOutlined, CloseOutlined} from '@ant-design/icons'
import {
    Link
} from "react-router-dom";
import { UserContext } from '../userContext';

const navigation = [{ "nav": 'Dashboard', "link": '/' }, { "nav": 'Customers', "link": '/customers' }, { "nav": 'Salons', "link": '/salons' }, { "nav": 'Membership Plans', "link": "/membershipplans" }, { "nav": 'Complains', "link": "/complains" }];

//const navigation = [{nav:'Dashboard', link:"Dashboard"}, 'Customers', 'Salons', 'Membership Plans', 'Complains'];

export default function Header() {

    const [val, setVal] = useState(0)
    const { isloggedIn, setloggedIn } = useContext(UserContext);

    return (
        <div>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <h1 style={{ color: 'white', fontSize: 20 }}>AR Salon</h1>
                                {/* <img src={logo} style={{height: '50px', width: '50px'}} alt="Logo" /> */}
                                <div className="flex items-center">

                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item, itemIdx) =>
                                                itemIdx === val ? (
                                                    <Fragment key={item.nav}>
                                                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                                        <Link to={item.link} className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                                            {item.nav}
                                                        </Link>
                                                    </Fragment>
                                                ) : (
                                                    <Link
                                                        onClick={() => { setVal(itemIdx) }}
                                                        key={item.nav}
                                                        to={item.link}
                                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                    >
                                                        {item.nav}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/*}
                                <div>
                                    {val !== 0 ? (<><HeaderSearch placeholder="Search" />
                                    <Tooltip title="search" >
                                        <Button shape="circle" icon={<SearchOutlined />} style={{marginLeft:'20px'}} />
                                    </Tooltip></>):(<></>)}    
                                </div>
                                {*/}
                                <Button onClick={() => setloggedIn(false)}>Logout</Button>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <CloseOutlined aria-hidden="true" color='white' />

                                        ) : (
                                            //   <MenuIcon className="block h-6 w-6"  />
                                            <MenuOutlined aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navigation.map((item, itemIdx) =>
                                    itemIdx === 0 ? (
                                        <Fragment key={item}>
                                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                            <a href="" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                                                {item}
                                            </a>
                                        </Fragment>
                                    ) : (
                                        <a
                                            key={item}
                                            href=""
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                        >
                                            {item}
                                        </a>
                                    )
                                )}
                            </div>

                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}