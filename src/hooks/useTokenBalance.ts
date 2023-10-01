export type Token = {
  metadata: {
    id: string;
    animation_url: string;
    name: string;
    description: string;
    image: string;
    traits: {
      trait_type: string;
      value: string;
    }[];
  };
};

const useTokenBalance = (balance: Token[] = []) => {
  const tokenIds = balance.map((token) => token.metadata.id);
  const tokens = balance.map((token) => ({
    tokenId: token.metadata.id,
    district: token.metadata.traits[0].value,
    label: `${token.metadata.name} of ${token.metadata.traits[0].value} district`
  }));

  const getToken = (tokenId: string) => {
    const token = tokens.find((token) => token.tokenId === tokenId);
    return token
  };

  return { tokenIds, tokens, getToken };
};

export default useTokenBalance;
