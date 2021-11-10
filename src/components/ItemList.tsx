import type { invoiceItemType } from "../models";

interface ItemListProp {
  itemList: [invoiceItemType];
  total: number;
}

const ItemList = ({ itemList, total }: ItemListProp) => {
  return (
    <div className="bg-app-light dark:bg-app-dark-5 mt-4 rounded-xl shadow">
      <div className="p-8 pb-0">
        <table className="w-full">
          <thead>
            <tr className="hidden md:table-row text-gray-400">
              <th className="text-left font-normal">Item Name</th>
              <th className="font-normal">QTY.</th>
              <th className="text-right font-normal">Price</th>
              <th className="text-right font-normal">Total</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item) => (
              <tr key={item.name} className="h-16">
                <td className="font-bold dark:text-white">{item.name}</td>
                <td className="text-center font-bold text-gray-400">{item.quantity}</td>
                <td className="text-right font-bold text-gray-400">{item.price}</td>
                <td className="text-right font-bold dark:text-white">£{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" bg-app-dark-3 dark:bg-app-dark-2 p-4 px-8 text-white rounded-b-xl flex justify-between items-end">
        <span className="text-gray-300">Amount Due</span>
        <span className="font-bold text-2xl">£{total}</span>
      </div>
    </div>
  );
};

export default ItemList;
