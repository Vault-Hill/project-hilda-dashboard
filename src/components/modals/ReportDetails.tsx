import { useEffect } from 'react';
import Modal from '.';
import { ReportDetails } from '../../types';

type Props = {
  data: ReportDetails | null;
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

type Item = {
  name: keyof ReportDetails;
  label: string;
};

const ReportDetailsModal: React.FC<Props> = ({ show = false, setShow, data }) => {
  const items: Item[] = [
    { name: 'name', label: "Customer's Name" },
    { name: 'phone', label: "Customer's Phone Number" },
    { name: 'email', label: "Customer's Email" },
    { name: 'totalMessages', label: 'Total Messages' },
    { name: 'sessionStartedAt', label: 'Session Started' },
    { name: 'sessionDuration', label: 'Session Duration' },
    { name: 'escalation', label: 'Escalation' },
  ];
  const renderContent = () => (
    <div className='space-y-7 p-5'>
      {items.map((item) => (
        <div key={item.name} className='flex justify-between border-b'>
          <p className='text-gray-500'>{item.label}</p>
          <p className='text-black'>{data?.[item.name] ?? '---'}</p>
        </div>
      ))}
    </div>
  );

  useEffect(
    () => () => {
      setShow(false);
    },
    [setShow],
  );

  if (!data) return null;

  return (
    <Modal
      title='Report Details'
      open={show}
      size='lg'
      onClose={() => setShow(false)}
      renderContent={renderContent}
    />
  );
};

export default ReportDetailsModal;
