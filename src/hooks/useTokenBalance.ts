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
  console.log('Balances', balance);

  const getToken = (tokenId: string) => {
    if (!tokenId) {
      return { label: '', district: '', tokenId: '' };
    } else {
      return tokens.find((token) => token.tokenId === tokenId);
    }
  };

  if (!balance || balance.length === 0) return {
    tokenIds: [],
    tokens: [],
    getToken,
  };

  const tokenIds = [] as string[];
  const tokens = balance.map((token) => {
    tokenIds.push(token.metadata.id);
    return {
      label: token.metadata.name,
      district: token.metadata.traits[0].value,
      tokenId: token.metadata.id,
    };
  });

  return { tokenIds, tokens, getToken };
};

export default useTokenBalance;
