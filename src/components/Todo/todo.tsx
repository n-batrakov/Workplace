import React, { Component } from 'react';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';



type TodoItemValue = {
    readonly id: string;
    readonly text : string;
    readonly isCompleted : boolean;
    readonly timestamp : Date;
};

type TodoListValue = {
    readonly items : TodoItemValue[];
    readonly showCompleted : boolean;
};

type TodoItemEventHandler = (item: TodoItemValue) => void;



class Todo extends React.Component<TodoListValue, TodoListValue> {
    constructor(props: TodoListValue) {
        super(props);
        this.state = props;
    }

    style: string = style({
        border: '1px solid black',
        margin: '10px',
        padding: '10px',
        width: '500px',
    });

    public render() {
        return <div className={this.style}>
                    <TodoListAddItemForm 
                        onAddItem={this.onAddItem.bind(this)} />
                    
                    <TodoList 
                        list={this.getList()} 
                        onItemToggled={this.onItemToggled.bind(this)} />
                        
                    <HideCompletedButton 
                            showCompleted={this.state.showCompleted}
                            onHideCompleted={this.onHideCompleted.bind(this)} />
               </div>;
    }

    private onAddItem(item: TodoItemValue) {
        this.setState({
            items: [...this.state.items, item],
        });
    }

    private onItemToggled(item: TodoItemValue) {
        const items = this.state.items.map(
            x => x === item 
                ? { ...x, isCompleted: !x.isCompleted } 
                : x);
        this.setState({ items });
    }

    private onHideCompleted() {
        this.setState({ showCompleted: !this.state.showCompleted });
    }

    private getList(): TodoListValue {
        if (this.state.showCompleted) {
            return this.state;
        }
        
        const items = this.state.items.filter(x => !x.isCompleted);
        return { ...this.state, items };
    }
}
export default Todo;


type TodoListProps = {
    list: TodoListValue; 
    onItemToggled: TodoItemEventHandler;
};

class TodoList extends React.Component<TodoListProps> {
    style : NestedCSSProperties = {
        border: '1px solid black',
    };

    public render() {
        const children = this.props.list.items
            .sort(this.itemComparer)
            .map(this.itemFactory.bind(this));
        return <div className={style(this.style)}>{children}</div>;
    }

    private itemFactory(value: TodoItemValue, idx: number) { 
        return <TodoItem 
            key={value.id}
            value={value} 
            onItemToggled={this.props.onItemToggled} />;
    }

    private itemComparer(a: TodoItemValue, b: TodoItemValue): number {
        if (a.timestamp === b.timestamp && a.isCompleted === b.isCompleted) {
            return 0;
        }

        if (a.isCompleted === b.isCompleted) {
            return a.timestamp > b.timestamp ? 1 : -1;
        }

        return a.isCompleted ? 1 : -1;
    }
}



type TodoItemProps = {
     value: TodoItemValue;
     onItemToggled: TodoItemEventHandler;
};

class TodoItem extends React.Component<TodoItemProps> {
    public render() {
        return  <div> 
                    <label className={style(this.getLabelStyle(this.props.value.isCompleted))}>
                        <input 
                            type = "checkbox"
                            key={this.props.value.id}
                            checked={this.props.value.isCompleted}
                            onChange={this.onItemCompleted.bind(this)}/>
                        {this.props.value.text}
                    </label>
                </div>;
    }

    private getLabelStyle(isCompleted: boolean) : NestedCSSProperties {
        return {
            textDecoration: isCompleted ? 'line-through' : '',
            color: isCompleted ? '#666666' : 'black',
        };
    }

    private onItemCompleted() {
        this.props.onItemToggled(this.props.value);
    }
}



type TodoListAddItemFormProps = {
    onAddItem: TodoItemEventHandler;
};
type TodoListAddItemFormState = {
    readonly text: string,
};

class TodoListAddItemForm 
    extends React.Component<TodoListAddItemFormProps, TodoListAddItemFormState> {

    constructor(props: TodoListAddItemFormProps) {
        super(props);

        this.state = { text: '' };
    }

    public render() {
        return <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input 
                        type="text"
                        value={this.state.text}
                        onChange={this.onInputChanged.bind(this)}/>
                    <button onClick={this.buttonClickHandler.bind(this)}>Add</button>
               </form>;
    }

    private buttonClickHandler(e : any) {
        this.props.onAddItem({
            id: Date.now().toString(),
            text: this.state.text,
            isCompleted: false,
            timestamp: new Date(Date.now()),
        });
    }

    private onInputChanged(e: any) {
        this.setState({ text: e.target.value });
    }

    private onFormSubmit(e: any) {
        e.preventDefault();
        this.setState({ text: '' });
    }
}


type HideCompletedEventHandler = () => void;
type HideCompletedButtonProps = {
    onHideCompleted: HideCompletedEventHandler,
    showCompleted: boolean,
};

class HideCompletedButton extends React.Component<HideCompletedButtonProps> {
    public render() {
        const btnName = this.props.showCompleted ? 'Hide Completed' : 'Show Completed'; 
        return <button onClick={this.onButtonClick.bind(this)}>{btnName}</button>;
    }

    private onButtonClick() {
        this.props.onHideCompleted();

    }
}