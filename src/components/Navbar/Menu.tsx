import { useClient } from '@/store/ShopStore';
import useTranslation from '@/utils/i18n/hooks';
import { useEffect, useRef, useState } from 'react';
import Bars3 from '../Icons/Bars3';
import XMark from '../Icons/XMark';

function CategoryListItem({ category }: { category: Category }) {
  return (
    <>
      <hr />
      <li className="my-2 truncate">{category.name}</li>
    </>
  );
}

export default function Menu() {
  const t = useTranslation;
  const menuDiv = useRef<HTMLDivElement>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const { client } = useClient();

  useEffect(() => {
    async function getCategories() {
      const categories = await client.fetch(`*[_type == "category"]`);
      setCategories(categories);
    }
    getCategories();
  }, [client]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (menuIsOpen && menuDiv.current && !menuDiv.current.contains(e.target)) {
        setMenuIsOpen(!menuIsOpen);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [menuIsOpen]);

  return (
    <div ref={menuDiv}>
      <button onClick={() => setMenuIsOpen(!menuIsOpen)} className="flex p-1 items-center text-xl">
        {menuIsOpen ? (
          <XMark className="text-white w-9 h-9" />
        ) : (
          <Bars3 className="text-white w-9 h-9" />
        )}
        <span className="hidden md:block hover:underline">Menu</span>
      </button>
      {menuIsOpen && (
        <>
          <div className="fixed z-50 p-4 text-black w-80 bg-white overflow-y-auto">
            <div>
              <h2 className="text-xl mb-3 font-medium">{t('navbar', 'buyByDepartment')}</h2>
              <ul>
                {categories.map((category: Category) => (
                  <CategoryListItem key={category._id} category={category} />
                ))}
              </ul>
            </div>
          </div>
          <div
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="opacity-25 fixed inset-0 z-40 bg-black"
          ></div>
        </>
      )}
    </div>
  );
}

type Category = {
  name: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};
