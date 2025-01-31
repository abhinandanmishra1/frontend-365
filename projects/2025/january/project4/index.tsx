import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const AccordionItem = ({
  title,
  children,
  isOpen = false,
  onToggle,
  isFirst,
  isLast,
}: AccordionItemProps) => {
  return (
    <div
      className={`border-b border-blue-200 ${isFirst ? "rounded-t-lg" : ""} ${
        isLast ? "rounded-b-lg" : ""
      } ${isOpen ? "bg-white text-black" : "bg-blue-500 text-white"} `}
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-5 transition-colors"
      >
        <span className="font-medium">{title}</span>
        <span className={`transform transition-transform duration-200`}>
          {isOpen ? "-" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all  ease-in-out px-4 duration-200 ${
          isOpen ? "max-h-96 pb-4 pt-0" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

interface AccordionMenuProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
}

const AccordionMenu = ({
  children,
  allowMultiple = false,
}: AccordionMenuProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const handleItemClick = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 ">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<AccordionItemProps>(child)) {
          return React.cloneElement(child, {
            isFirst: index === 0,
            isLast: index === React.Children.count(children) - 1,
            isOpen: openItems.includes(index),
            onToggle: () => handleItemClick(index),
          });
        }
        return child;
      })}
    </div>
  );
};

export default function Project4() {
  const [allowMultiple, setAllowMultiple] = useState(false);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="allowMultiple"
          className=""
          checked={allowMultiple}
          onChange={() => setAllowMultiple(!allowMultiple)}
        />
        <label htmlFor="allowMultiple" className="text-sm cursor-pointer">
          Allow Multiple Open
        </label>
      </div>
      <AccordionMenu allowMultiple={allowMultiple}>
        <AccordionItem title="Can I cancel my subscription at anytime?">
          <p className="text-sm text-gray-500">
            Yes, you can cancel your subscription at anytime. You can cancel
            your subscription by going to your account settings and clicking the
            "Cancel Subscription" button.
          </p>
        </AccordionItem>
        <AccordionItem title="How do I cancel my subscription?">
          <p className="text-sm text-gray-500">
            You can cancel your subscription by going to your account settings
            and clicking the "Cancel Subscription" button.
          </p>
        </AccordionItem>
        <AccordionItem title="What is your refund policy?">
          <p className="text-sm text-gray-500">
            If you are not satisfied with our service, you can request a refund
            within 7 days of your purchase. Please contact us at
            support@example.com for more information.
          </p>
        </AccordionItem>
        <AccordionItem title="Do you offer any discounts?">
          <p className="text-sm text-gray-500">
            Yes, we offer a 10% discount for students. Please contact us at
            support@example.com for more information.
          </p>
        </AccordionItem>
        <AccordionItem title="Can I request a refund?">
          <p className="text-sm text-gray-500">
            Yes, you can request a refund by going to your account settings and
            clicking the "Request Refund" button.
          </p>
        </AccordionItem>
      </AccordionMenu>
    </div>
  );
}
