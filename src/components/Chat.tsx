import { cx } from "class-variance-authority";
import { Chat as ChatType } from "../types";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

const Chat = ({ message }: { message: ChatType }) => {
	const containerClass = cx("flex w-full text-xs md:text-base", {
		"justify-start rounded-md relative": message.role === "assistant",
		"justify-end rounded-md": message.role === "user",
	});

	const itemClass = cx(
		"p-4 text-white rounded-b-xl max-w-[80%] md:max-w-[35rem]",
		{
			"rounded-tr-xl bg-white bg-opacity-10 relative":
				message.role === "assistant",
			"rounded-tl-xl user-message-gradient": message.role === "user",
		}
	);

	return (
		<section className={containerClass}>
			<span className={itemClass}>
				<ReactMarkdown
					components={{
						code(props) {
							const { children } = props;
							return <code className="font-sans">{children}</code>;
						},
					}}
					className="[&>pre]:whitespace-pre-line"
					rehypePlugins={[rehypeSanitize]}
				>
					{message.content}
				</ReactMarkdown>
			</span>
		</section>
	);
};

export default Chat;
