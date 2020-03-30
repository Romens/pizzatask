import cn from 'classnames';
import React, {Component} from 'react';

class MessagesFrame extends Component {
    messageRoot = React.createRef();

    state = {
        messages: null,
    };

    componentDidMount() {
        this.getMessages();
        this.update();
    }

    getMessages = async () => {
        try {
            const {data} = await axios.get(window.laroute.route('tech.support.getMessages', {id: this.props.ticketId}));
            this.setState({messages: data.ticket.messages});
            $('.message-root').scrollTop($('.message-root').prop('scrollHeight'));
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        return (
            <div className="message-root" ref={this.messageRoot}>
                <div className="message-container">
                    {
                        this.state.messages && this.state.messages.map((message, key) => {
                            return <div
                                className={cn(
                                    'card',
                                    {'card-message_left': window.user.id === message.user_id},
                                    {'card-message_right': window.user.id !== message.user_id}
                                )
                                }
                                key={key}
                            >

                                <div className="card-message-header">
                                    <a
                                        className="card-message-header__link"
                                        href={window.laroute.route('getProfile', {
                                            id: message.user.id,
                                            slug: message.user.slug
                                        })}
                                    >
                                        <img
                                            className="card-message-header__avatar avatar"
                                            alt="64x64"
                                            src={message.user.avatar_url}
                                        />
                                    </a>
                                    <span className="card-message-header__name">
<a
    href={window.laroute.route('getProfile', {id: message.user.id, slug: message.user.slug})}
>
{message.user.nickname}
</a>
</span>
                                    <span className="card-message-header__time">{message.createdAtFormat}</span>
                                </div>

                                <div className="card-message-body">
                                    <div dangerouslySetInnerHTML={{__html: message.message}}/>
                                </div>

                                <div className="card-message-footer">
                                    {
                                        message.files.length > 0 && message.files.map((file, key) => {
                                            return <div key={key}>
                                                <a
                                                    href={file.filePath}
                                                    target="_blank"
                                                >
                                                    {file.name}
                                                </a>
                                            </div>;
                                        })
                                    }
                                </div>
                            </div>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default MessagesFrame;