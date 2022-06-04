import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 20vh;
  overflow-y: auto;
  font-size: clamp(1em, 5vw, 1.3em);
  width: 100%;
  
  ::-webkit-scrollbar {
    width: 20px;        
  }
  ::-webkit-scrollbar-track {
    background: #90be72;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);      
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    background: #2e4712; 
  }
`;

const ListContainer = styled.ul`
  margin: 0;
  list-style-position: outside;
`;

const ListItem = styled.li`
  margin: 0;
`

const Message = styled.span`
  text-align: center;
  display: flex;
  justify-content: center;
`;

interface ListProps {
  listItems: string[];
  emptyListMessage?: string;
}

const List: FC<ListProps> = ({ listItems, emptyListMessage = '', ...rest }) => {
  const hasListItems = Boolean(listItems.length);
  const listContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listContainer.current) {
      listContainer.current.scrollTop = listContainer.current.scrollHeight;
    }
  }, [listItems])

  return (
    <Container ref={listContainer} {...rest}>
      {hasListItems ?
        <ListContainer>
          {listItems.map((listItem) => <ListItem data-test-id='list-item' key={listItem}>{listItem}</ListItem>)}
        </ListContainer>
        :
        <Message data-test-id='empty-list-message'>{emptyListMessage}</Message>
      }
    </Container>
  );
};

export default List;
