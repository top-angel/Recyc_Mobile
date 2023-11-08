import { useEffect, MutableRefObject } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { resetTriggerChat } from "redux/storers/storerTriggerChat/storerTriggerChat.slice";

type Props = {
  chatRef: MutableRefObject<any>;
  chatroom: Message[];
};

const useScrollChatRoom = ({ chatRef, chatroom }: Props) => {
  const { success } = useAppSelector((state) => state.storerTriggerChat);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-console
  console.log(success);

  useEffect(() => {
    if (success) {
      chatRef?.current?.scrollToEnd({ animated: true });
      dispatch(resetTriggerChat());
    }
  }, [chatroom, chatRef, success, dispatch]);
};

export { useScrollChatRoom };
