import { QueryClient, useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { updateProfile } from "../fetchers/updateProfile";
import { useStorage } from "../hooks/useStorage";
import TextArea from "./TextArea";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

type Props = {
	data: {
		knowledgeBase: string;
	};
};

const TrainingText: React.FC<Props> = ({ data }) => {
	const { getItem: getAuth } = useStorage("session");
	const auth = getAuth("auth");
	const navigate = useNavigate();

	const methods = useForm({
		mode: "onBlur",
		defaultValues: {
			knowledgeBase: data?.knowledgeBase,
		},
	});

	const queryClient = new QueryClient();

	const mutation = useMutation({
		mutationFn: updateProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["orgData"],
			});
		},
	});

	const onSubmit = methods.handleSubmit((data) => {
		mutation.mutate({
			knowledgeBase: data.knowledgeBase,
			token: auth?.accessToken,
		});
	});

	const canSave = data?.knowledgeBase !== methods.getValues("knowledgeBase");

	return (
		<div className="text-[#757575] max-w-3xl">
			<span
				role="button"
				onClick={() => navigate(-1)}
				className="text-3xl flex gap-x-4 items-center "
			>
				<ChevronLeftIcon className="h-6 w-6" />
				Back
			</span>
			<div className="cursor-pointer text-black dark:text-white flex justify-between mt-6">
				<span className="text-3xl ">Add Text</span>
				<button
					className="bg-black dark:bg-white dark:text-black px-10 py-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
					type="submit"
					onClick={onSubmit}
					disabled={!canSave}
				>
					{mutation.isPending ? "Updating..." : "Update"}
				</button>
			</div>

			<FormProvider {...methods}>
				<form className="space-y-7 pt-7">
					<fieldset
						className="space-y-7"
						disabled={methods.formState.isSubmitting}
					>
						<TextArea
							name="knowledgeBase"
							label="Text"
							spellCheck="false"
							rows={20}
						/>
					</fieldset>
				</form>
			</FormProvider>
		</div>
	);
};

export default TrainingText;
