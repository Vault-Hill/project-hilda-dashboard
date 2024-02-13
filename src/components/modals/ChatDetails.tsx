import { useEffect } from "react";
import Modal from ".";
import { Chat as ChatType } from "../../types";
import Chat from "../Chat";

type Props = {
	data: ChatType[] | null;
	showChat?: boolean;
	setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatDetailsModal: React.FC<Props> = ({
	showChat = false,
	setShowChat,
	data,
}) => {
	const renderContent = () => (
		<div className="flex flex-1 flex-col gap-y-4 md:gap-y-8 p-3 md:px-6 h-full overflow-y-scroll scrollbar-hide bg-[#0F0516] max-h-[70vh]">
			{data?.map((message) => (
				<Chat message={message} />
			))}
		</div>
	);

	useEffect(
		() => () => {
			setShowChat(false);
		},
		[setShowChat]
	);

	if (!data) return null;

	return (
		<Modal
			title="Chat Details"
			open={showChat}
			size="lg"
			className="w-[700px]"
			onClose={() => setShowChat(false)}
			renderContent={renderContent}
		/>
	);
};

export default ChatDetailsModal;
