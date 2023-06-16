package com.chatigo.database;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Objects;

import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import com.chatigo.models.ChangeSettings;
import com.chatigo.models.ChatInfo;
import com.chatigo.models.ChatToSend;
import com.chatigo.models.CommentToSend;
import com.chatigo.models.EditProfile;
import com.chatigo.models.FiltreUsers;
import com.chatigo.models.Message;
import com.chatigo.models.MessagesToSend;
import com.chatigo.models.Post;
import com.chatigo.models.UserAuthorization;
import com.chatigo.models.UserChat;
import com.chatigo.models.UserPage;
import com.chatigo.models.UserRegistrate;
import com.chatigo.models.PostToSend;
import com.chatigo.models.ImagesToSend;

public class DataBaseConnection {
	private static final String URL = "jdbc:postgresql://localhost:5433/chatigo";
	private static final String USERNAME = "postgres";
	private static final String PASSWORD = "root";
	private final String photoPath = "C:\\java-projects\\sn\\src\\main\\resources\\img\\";
	
	private static Connection connection;
	
	static {
		try {
			Class.forName("org.postgresql.Driver");
		}
		catch(ClassNotFoundException e) {
			System.out.println("Driver");
		}
		
		try {
			connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
		} 
		catch (SQLException e) {
			System.out.println("Connection");
		}
	}
	
	public int createUser(UserRegistrate user) {
		try {
			Statement statement = connection.createStatement();
			LocalDate regDate = LocalDate.now();
			String sql = "INSERT INTO \"User\" VALUES(default,'" + user.getUserName() + "','" + user.getUserSurname() + "','" 
					+ user.getUserEmail() + "','" + user.getUserPassword() + "','" 
					+ user.getUserBirthday() + "','" + regDate + "','" + user.getUserGender() + "', 0)";
			statement.executeUpdate(sql);
			sql = "SELECT id FROM public.\"User\" WHERE email='" + user.getUserEmail() + "'";
			ResultSet result = statement.executeQuery(sql);
			result.next();
			int id = result.getInt("id");
			statement.close();
			return id;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return -1;
		}
	}
	
	public int getUserId(UserAuthorization user) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT id FROM public.\"User\" WHERE email='" + user.getUserEmail() + "'";
			ResultSet result = statement.executeQuery(sql);
			result.next();
			int id = result.getInt("id");
			statement.close();
			return id;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return -1;
		}
	}
	
	public boolean exist(UserRegistrate user) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT email FROM public.\"User\" WHERE email=" + "'" + user.getUserEmail() + "' AND password='" + user.getUserPassword() + "'";
			ResultSet result = statement.executeQuery(sql);
			boolean ans = result.next();
			statement.close();
			return ans;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return true;
		}
	}
	
	public boolean exist(UserAuthorization user) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT email FROM public.\"User\" WHERE email=" + "'" + user.getUserEmail() + "' AND password='" + user.getUserPassword() + "'";
			ResultSet result = statement.executeQuery(sql);
			boolean ans = result.next();
			statement.close();
			return ans;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return true;
		}
	}
	
	public boolean exist(int userId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT email FROM public.\"User\" WHERE id=" + userId;
			ResultSet result = statement.executeQuery(sql);
			boolean ans = result.next();
			statement.close();
			return ans;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return true;
		}
	}
	
	public boolean existPost(int postId) {
        try {
            Statement statement = connection.createStatement();
            String sql = "SELECT id FROM public.\"Post\" WHERE id=" + postId;
            ResultSet result = statement.executeQuery(sql);
            boolean ans = result.next();
            statement.close();
            return ans;
        }
        catch(Exception ex) {
            ex.printStackTrace();
            return true;
        }
    }
	
	public boolean existEmail(String email) {
        try {
            Statement statement = connection.createStatement();
            String sql = "SELECT id FROM public.\"User\" WHERE email='" + email + "'";
            ResultSet result = statement.executeQuery(sql);
            boolean ans = result.next();
            statement.close();
            return ans;
        }
        catch(Exception ex) {
            ex.printStackTrace();
            return true;
        }
    }
	
	public boolean checkUserById(int userId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT email FROM public.\"User\" WHERE id=" + userId;
			ResultSet result = statement.executeQuery(sql);
			boolean ans = result.next();
			statement.close();
			return ans;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}
	
	public boolean checkChatById(int chatId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT name FROM public.\"Chat\" WHERE id=" + chatId;
			ResultSet result = statement.executeQuery(sql);
			boolean ans = result.next();
			statement.close();
			return ans;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}
	// 0 -1 на 1
	// 1 - групповой
	public void createChat(UserChat chat) {
		try {
			Statement statement = connection.createStatement();
			LocalDate createDate = LocalDate.now();
			int type = 0;
			if(chat.getUsers().length > 2) {
				type = 1;
			}
			String sql = "INSERT INTO \"Chat\" VALUES(default,'" + chat.getName() +"','" + createDate + "', " + type + ")";
			statement.executeUpdate(sql);
			statement.cancel();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addImageToImage(String path) {
		try {
			Statement statement = connection.createStatement();
			String sql = "INSERT INTO \"Image\" VALUES(default,'" + path + "')";
			statement.executeUpdate(sql);
			statement.cancel();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addUserImage(int userId, String path) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT id FROM public.\"Image\" WHERE path='" + path + "'";
			ResultSet resultId = statement.executeQuery(sql);
			resultId.next();
			int imageId = resultId.getInt("id");
			
			sql = "INSERT INTO \"User_Image\" VALUES(" + imageId +"," + userId + ")";
			statement.executeUpdate(sql);
			
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addMainImageToUser(int userId, String path) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT id FROM public.\"Image\" WHERE path='" + path + "'";
			ResultSet resultId = statement.executeQuery(sql);
			resultId.next();
			int imageId = resultId.getInt("id");
			
			sql = "UPDATE public.\"User\" SET image=" + imageId + " WHERE id=" + userId;
			statement.executeUpdate(sql);
			
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addChatImage(int chatId, String path) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT id FROM public.\"Image\" WHERE path='" + path + "'";
			ResultSet resultId = statement.executeQuery(sql);
			resultId.next();
			int imageId = resultId.getInt("id");
			
			sql = "UPDATE public.\"Chat\" SET image=" + imageId + " WHERE id=" + chatId;
			statement.executeUpdate(sql);
			
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addChatUser(int[] users) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT MAX(id) as id FROM public.\"Chat\"";
			ResultSet resultId = statement.executeQuery(sql);
			resultId.next();
			int chatId = resultId.getInt("id");
			
			for(int u : users) {
				sql = "INSERT INTO \"ChatAndUser\" VALUES(" + chatId + ", " + u +")";
				System.out.println(chatId + " " + u);
				statement.executeUpdate(sql);
			}
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addMessage(Message mes) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT id FROM public.\"Image\" WHERE path='" + mes.getPath() + "'";
			ResultSet resultP = statement.executeQuery(sql);
			resultP.next();
			int id = resultP.getInt("id");
			sql = "INSERT INTO \"Message\"(\"chatId\", \"userId\", \"text\", \"imageId\", \"type\") VALUES(" + mes.getChatId() + "," + mes.getUserId() + ", '" + mes.getText() + "', " + id + "," + 0 +")";
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addMessageWithoutImage(Message mes) {
		try {
			Statement statement = connection.createStatement();
			String sql = "INSERT INTO \"Message\"(\"chatId\", \"userId\", \"text\", \"type\") VALUES(" + mes.getChatId() + "," + mes.getUserId() + ", '" + mes.getText() + "', " + 0 + ")";
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public int getLastPostId() {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT MAX(id) as id FROM public.\"Post\"";
			ResultSet resultId = statement.executeQuery(sql);
			int postId;
			if(resultId.next()) {
				postId = resultId.getInt("id");
			}
			else {
				postId = -1;
			}
			statement.close();
			return postId;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return -1;
		}
	}
	
	public void addNewPost(Post post) {
		try {
			Statement statement = connection.createStatement();
			String sql = "INSERT INTO \"Post\"(\"UserId\", \"Text\") VALUES(" + post.getUserId() + ", '" + post.getText() + "')";
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addPostImage(int postId, String path) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT id FROM public.\"Image\" WHERE path='" + path + "'";
			ResultSet resultP = statement.executeQuery(sql);
			resultP.next();
			int id = resultP.getInt("id");
			sql = "UPDATE public.\"Post\" SET \"ImageId\"=" + id + " WHERE id=" + postId;
			statement.executeUpdate(sql);
			sql = "INSERT INTO \"Post_Image\"(\"ImageId\", \"PostId\") VALUES(" + id + ", " + postId + ")";
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addNewPostWithoutImage(Post post) {
		try {
			Statement statement = connection.createStatement();
			String sql = "INSERT INTO \"Post\"(\"UserId\", \"Text\") VALUES(" + post.getUserId() + ", '" + post.getText() + "')";
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	} 
	
	public String getMainImagePath(int userId) {
		try {
			String path = "";
			Statement statement = connection.createStatement();
			String sql = "SELECT \"image\" FROM public.\"User\" WHERE id=" + userId;
			ResultSet result = statement.executeQuery(sql);
			if(result.next()) {
				int imageId = result.getInt("image");
				sql = "SELECT path FROM public.\"Image\" WHERE id=" + imageId;
				ResultSet resultPath = statement.executeQuery(sql);
				if(resultPath.next()) {
					path = resultPath.getString("path");
				}
				else {
					
					path = getPhotoPath() + "users\\default\\logo.jpg";
				}
				statement.close();
			}
			else {
				path = getPhotoPath() + "users\\default\\logo.jpg";
			}
			return path;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return "";
		}
	}
	
	public void createRelation(int sendUserId, int getUserId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "INSERT INTO public.\"Relation\"(\"SendUserId\", \"GetUserId\", \"Type\") VALUES(" + sendUserId + ", " + getUserId + ", " + 1 + ")";
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void acceptRelation(int sendUserId, int getUserId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "UPDATE public.\"Relation\" SET \"Type\"=" + 2 + " WHERE \"SendUserId\"=" + sendUserId + " AND \"GetUserId\"=" + getUserId;
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void deleteRelation(int sendUserId, int getUserId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "DELETE FROM public.\"Relation\" WHERE (\"SendUserId\"=" + sendUserId + " AND \"GetUserId\"=" + getUserId + ") OR (\"SendUserId\"=" + getUserId + " AND \"GetUserId\"=" + sendUserId +")";
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public ArrayList<PostToSend> getPostsForNews(int userId) {
		try {
			ArrayList<PostToSend> posts = new ArrayList<PostToSend>();
			Statement statement = connection.createStatement();
			String sql = "SELECT \"Post\".\"id\", \r\n"
					+ "\"Post\".\"UserId\" as \"CreatorUserId\", \r\n"
					+ "\"ImageForUser\".\"path\" as \"UserImage\", \r\n"
					+ "\"Text\" AS \"PostText\", \r\n"
					+ "\"Date\", \r\n"
					+ "\"ImageForPost\".\"path\" as \"PostPath\",\r\n"
					+ "\"User\".\"name\",\r\n"
					+ "\"User\".\"surname\",\r\n"
					+ "(SELECT COUNT(\"id\") FROM \"Reactions\" WHERE \"Reactions\".\"PostId\" = \"Post\".\"id\") AS \"LikeCnt\",\r\n"
					+ "(SELECT COUNT(\"id\") FROM \"Comment\" WHERE \"Comment\".\"PostId\" = \"Post\".\"id\") AS \"CommentCnt\",\r\n"
					+ "CASE WHEN\r\n"
					+ "\"Reactions\".\"id\" IS NULL\r\n"
					+ "THEN false\r\n"
					+ "ELSE true\r\n"
					+ "END \"LikedFlag\"\r\n"
					+ "FROM\r\n"
					+ "(SELECT \"GetUserId\" as \"FriendID\" FROM public.\"Relation\" WHERE \"SendUserId\" = " + userId + "\r\n"
					+ "UNION\r\n"
					+ "SELECT \"SendUserId\" FROM public.\"Relation\" WHERE \"GetUserId\" = " + userId + ") AS FrTable JOIN\r\n"
					+ "public.\"Post\" ON \"UserId\" = \"FriendID\" JOIN \"User\" ON \"FriendID\" = \"User\".\"id\" \r\n"
					+ "LEFT JOIN public.\"Image\" AS \"ImageForPost\" \r\n"
					+ "ON \"ImageForPost\".\"id\" = \"Post\".\"ImageId\"\r\n"
					+ "LEFT JOIN \"Image\" AS \"ImageForUser\" \r\n"
					+ "ON \"ImageForUser\".\"id\" = \"User\".\"image\"\r\n"
					+ "LEFT JOIN \"Reactions\"\r\n"
					+ "ON \"Post\".\"id\" = \"Reactions\".\"PostId\" AND \"Reactions\".\"UserId\" = " + userId + "\r\n"
					+ "ORDER BY \"Post\".\"id\" DESC";
			ResultSet result = statement.executeQuery(sql);
			while(result.next()) {
				posts.add(new PostToSend(result.getInt("CreatorUserId"), result.getString("UserImage"), result.getString("name"), 
										 result.getString("surname"), result.getInt("id"), result.getString("Date"), result.getString("PostText"), 
										 result.getString("PostPath"), result.getInt("LikeCnt"), result.getBoolean("LikedFlag"), result.getInt("CommentCnt")));
			}
			statement.close();
			return posts;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public boolean createOrDelteReaction(int userId, int postId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT id FROM public.\"Reactions\" WHERE \"UserId\"=" +  userId + " AND \"PostId\"=" + postId;
			ResultSet result = statement.executeQuery(sql);
			boolean isLike = false;
			if(result.next()) {
				sql = "DELETE FROM public.\"Reactions\" WHERE \"UserId\"=" + userId + " AND \"PostId\"=" + postId;
				statement.executeUpdate(sql);
				isLike = false;
			}
			else {
				sql = "INSERT INTO public.\"Reactions\"(\"UserId\", \"PostId\") VALUES(" + userId + ", " + postId + ")";
				statement.executeUpdate(sql);
				isLike = true;
			}
			statement.close();
			return isLike;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}
	
	public int getLikeCountByPost(int postId) {
		int cnt = -1;
		try {
			if(existPost(postId)) {
				Statement statement = connection.createStatement();
				String sql = "SELECT COUNT(*) as cnt FROM public.\"Reactions\" WHERE \"PostId\"=" + postId;
				ResultSet result = statement.executeQuery(sql);
				if(result.next()) {
					cnt = result.getInt("cnt");
				}
				statement.close();
			}
			return cnt;
			
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return cnt;
		}
	}
	
	public void createComment(int userId, int postId, String text) {
		try {
			try {
				Statement statement = connection.createStatement();
				String sql = "INSERT INTO public.\"Comment\"(\"UserId\", \"Text\", \"PostId\") VALUES(" + userId + ", '" + text + "', " + postId + ")";
				statement.executeUpdate(sql);
				statement.close();
			}
			catch(Exception ex) {
				ex.printStackTrace();
			}
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public ArrayList<CommentToSend> getComments(int postId) {
		try {
			ArrayList<CommentToSend> comments = new ArrayList<CommentToSend>();
			Statement statement = connection.createStatement();
			String sql = "SELECT \r\n"
					+ "\"Comment\".\"id\" AS \"commentId\",\r\n"
					+ "\"Comment\".\"UserId\" AS \"userId\",\r\n"
					+ "\"Image\".\"path\" AS \"userImage\",\r\n"
					+ "\"User\".\"name\" AS \"userName\",\r\n"
					+ "\"User\".\"surname\" AS \"userSurname\",\r\n"
					+ "\"Comment\".\"Text\" AS \"commentText\",\r\n"
					+ "\"Comment\".\"Date\" AS \"commentDate\"\r\n"
					+ "FROM public.\"Comment\" JOIN public.\"User\" ON \"Comment\".\"UserId\" = \"User\".\"id\" \r\n"
					+ "LEFT JOIN \"Image\" ON \"User\".\"image\" = \"Image\".\"id\"\r\n"
					+ "WHERE \"Comment\".\"PostId\" = " + postId + " ORDER BY \"commentId\" ASC";
			ResultSet result = statement.executeQuery(sql);
			while(result.next()) {
				comments.add(new CommentToSend(result.getInt("commentId"), result.getInt("userId"), result.getString("userImage"), 
										 result.getString("userName"), result.getString("userSurname"), result.getString("commentText"), result.getString("commentDate")));
			}
			statement.close();
			return comments;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	public int getRelationType(int sendUserId, int getUserId) {
		//send - кто
		//get - к кому
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT * FROM public.\"Relation\" WHERE (\"SendUserId\"=" + sendUserId + " AND \"GetUserId\"=" + getUserId + ") OR (\"SendUserId\"=" + getUserId + " AND \"GetUserId\"=" + sendUserId + ")";
			ResultSet result = statement.executeQuery(sql);
			int rel = 0;
			if(result.next()) {
				int send = result.getInt("SendUserId");
				int get = result.getInt("GetUserId");
				int type = result.getInt("Type");
				
				if(type == 1 && send == sendUserId && get == getUserId) {
					rel = 1;
				}
				else if(type == 1 && send == getUserId && get == sendUserId) {
					rel = 2;
				}
				else if(type == 2) {
					rel = 3;
				}
			}
			return rel;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return -1;
		}
	}
	
	public UserPage getUserPageInfo(int getUserId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT * FROM public.\"User\" WHERE id=" + getUserId;
			ResultSet result = statement.executeQuery(sql);
			result.next();			
			return new UserPage(result.getInt("id"), result.getString("name"), result.getString("surname"), result.getString("birthday"), result.getString("regdate"), 
								result.getString("gender"), result.getInt("online"), getMainImagePath(result.getInt("id")), result.getString("description"));
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public ArrayList<ImagesToSend> getUserImages(int userId) {
        try {
            Statement statement = connection.createStatement();
            ArrayList<Integer> imageIds = new ArrayList<Integer>();
            ArrayList<String> imageDates = new ArrayList<String>();
            ArrayList<ImagesToSend> answer = new ArrayList<ImagesToSend>();
            String sql = "SELECT \"ImageId\", \"Date\" FROM public.\"User_Image\" WHERE \"UserId\"=" + userId + " ORDER BY \"Date\" DESC";
            ResultSet result = statement.executeQuery(sql);
            while(result.next()) {
                imageIds.add(result.getInt("ImageId"));
                imageDates.add(result.getString("Date"));
            }
            
            for(Integer x : imageIds) {
                sql = "SELECT \"path\" FROM public.\"Image\" WHERE id=" + x;
                result = statement.executeQuery(sql);
                result.next();
                byte[] fileContent = FileUtils.readFileToByteArray(new File(result.getString("path")));
                String image = Base64.getEncoder().encodeToString(fileContent);
                answer.add(new ImagesToSend(x, image, imageDates.get(imageIds.indexOf(x))));
            }
            return answer;
        }
        catch(Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
	
	public ArrayList<PostToSend> getUserPagePosts(int getUserId, int sendUserId) {
		try {
			ArrayList<PostToSend> posts = new ArrayList<PostToSend>();
			Statement statement = connection.createStatement();
			String sql = "SELECT \r\n"
					+ "\"Post\".\"id\" AS \"postId\",\r\n"
					+ "\"Post\".\"Date\" AS \"postDate\",\r\n"
					+ "\"Post\".\"Text\" AS \"postText\",\r\n"
					+ "\"Im1\".\"path\" AS \"postImage\",\r\n"
					+ "\"User\".\"name\" AS \"userName\",\r\n"
					+ "\"User\".\"surname\" AS \"userSurname\",\r\n"
					+ "\"Im2\".\"path\" AS \"userImage\",\r\n"
					+ "(SELECT COUNT(\"Reactions\".\"id\") \r\n"
					+ " FROM public.\"Reactions\" WHERE \"Reactions\".\"PostId\" = \"Post\".\"id\") AS \"likeCount\",\r\n"
					+ " (SELECT COUNT(\"Comment\".\"id\") \r\n"
					+ " FROM public.\"Comment\" WHERE \"Comment\".\"PostId\" = \"Post\".\"id\") AS \"commentCount\",\r\n"
					+ " CASE WHEN\r\n"
					+ "\"Reactions\".\"id\" IS NULL\r\n"
					+ "THEN false\r\n"
					+ "ELSE true\r\n"
					+ "END \"LikedFlag\"\r\n"
					+ "FROM public.\"Post\" \r\n"
					+ "JOIN public.\"User\" ON \"Post\".\"UserId\" = \"User\".\"id\" \r\n"
					+ "LEFT JOIN public.\"Image\" AS \"Im1\" ON \"Im1\".\"id\" = \"Post\".\"ImageId\"\r\n"
					+ "LEFT JOIN public.\"Image\" AS \"Im2\" ON \"Im2\".\"id\" = \"User\".\"image\"\r\n"
					+ "LEFT JOIN \"Reactions\"\r\n"
					+ "ON \"Post\".\"id\" = \"Reactions\".\"PostId\" AND \"Reactions\".\"UserId\" = " + sendUserId + "\r\n"
					+ "WHERE \"Post\".\"UserId\" = " + getUserId + "\r\n"
					+ "ORDER BY \"Post\".\"id\" DESC";
			ResultSet result = statement.executeQuery(sql);
			while(result.next()) {
				posts.add(new PostToSend(getUserId, result.getString("userImage"), result.getString("userName"), 
										 result.getString("userSurname"), result.getInt("postId"), result.getString("postDate"), result.getString("postText"), 
										 result.getString("postImage"), result.getInt("likeCount"), result.getBoolean("LikedFlag"), result.getInt("commentCount")));
			}
			statement.close();
			return posts;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public void updateSettings(ChangeSettings cs) {
        try {
            String sql = "UPDATE public.\"User\" SET \"email\"='" + cs.getEmail() + "', \"password\"='" + cs.getPasword() + "' WHERE id=" + cs.getUserId();
            if(cs.getEmail().isEmpty() || cs.getEmail() == null) {
                if(!cs.getPasword().isEmpty() && cs.getPasword() != null) {
                    sql = "UPDATE public.\"User\" SET \"password\"='" + cs.getPasword() + "' WHERE id=" + cs.getUserId();
                }
            }
            else if(cs.getPasword().isEmpty() || cs.getPasword() == null) {
                if(!cs.getEmail().isEmpty() && cs.getEmail() != null) {
                    sql = "UPDATE public.\"User\" SET \"email\"='" + cs.getEmail() + "' WHERE id=" + cs.getUserId();
                }
            }

            if(!(cs.getEmail().isEmpty() || cs.getEmail() == null) || !(cs.getPasword().isEmpty() || cs.getPasword() == null)) {
                Statement statement = connection.createStatement();
                statement.execute(sql);
                statement.close();
            }
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
    }
	
	public void updateProfile(EditProfile ep) {
        try {
            Statement statement = connection.createStatement();
            String sql = "SELECT * FROM public.\"User\" WHERE id=" + ep.getUserId();
            ResultSet user = statement.executeQuery(sql);
            user.next();
            String userName = user.getString("name");
            String userSurname = user.getString("surname"); 
            String description = user.getString("description");
            if(!ep.getUserName().isEmpty() && ep.getUserName() != null) {
                userName = ep.getUserName();
            }
            if(!ep.getUserSurname().isEmpty() && ep.getUserSurname() != null) {
                userSurname = ep.getUserSurname();
            }
            if(!ep.getDesription().isEmpty() && ep.getDesription() != null) {
                description = ep.getDesription();
            }
            sql = "UPDATE public.\"User\" SET \"name\"='" + userName + "', \"surname\"='" + userSurname + "', \"description\"='" + description + "' WHERE id=" + ep.getUserId();
            statement.executeUpdate(sql);
            statement.close();
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
    }
	
	public ArrayList<FiltreUsers> getAllFriendsByUser(int userId) {
		try {
			ArrayList<FiltreUsers> users = new ArrayList<FiltreUsers>();
			ArrayList<Integer> ids = new ArrayList<Integer>();
			Statement statement = connection.createStatement();
			String sql = "SELECT \"SendUserId\" as id FROM public.\"Relation\" WHERE \"GetUserId\"=" + userId + " AND \"Type\"=" + 2 +
						 " UNION " +
						 "SELECT \"GetUserId\" FROM public.\"Relation\" WHERE \"SendUserId\"=" + userId + " AND \"Type\"=" + 2;
			ResultSet result = statement.executeQuery(sql);
			while(result.next()) {
				ids.add(result.getInt("id"));
			}
			ResultSet user;
			for(int id : ids) {
				sql = "SELECT * FROM public.\"User\" WHERE id=" + id;
				user = statement.executeQuery(sql);
				user.next();
				users.add(new FiltreUsers(user.getInt("id"), user.getString("name"), user.getString("surname"), user.getInt("online")));
			}
			statement.close();
			return users;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public ArrayList<FiltreUsers> getFriendsOnlineByUser(int userId) {
		try {
			ArrayList<FiltreUsers> users = new ArrayList<FiltreUsers>();
			ArrayList<Integer> ids = new ArrayList<Integer>();
			Statement statement = connection.createStatement();
			String sql = "SELECT \"SendUserId\" as id FROM public.\"Relation\" WHERE \"GetUserId\"=" + userId + " AND \"Type\"=" + 2 +
						 " UNION " +
						 "SELECT \"GetUserId\" FROM public.\"Relation\" WHERE \"SendUserId\"=" + userId + " AND \"Type\"=" + 2;
			ResultSet result = statement.executeQuery(sql);
			while(result.next()) {
				ids.add(result.getInt("id"));
			}
			for(int id : ids) {
				sql = "SELECT * FROM public.\"User\" WHERE id=" + id + " AND online=" + 1;
				ResultSet user = statement.executeQuery(sql);
				if(user.next()) {
					users.add(new FiltreUsers(user.getInt("id"), user.getString("name"), user.getString("surname"), user.getInt("online")));
				}
			}
			statement.close();
			return users;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public ArrayList<FiltreUsers> getRequestsInFriendsByUser(int userId) {
		try {
			ArrayList<FiltreUsers> users = new ArrayList<FiltreUsers>();
			ArrayList<Integer> ids = new ArrayList<Integer>();
			Statement statement = connection.createStatement();
			String sql = "SELECT \"SendUserId\" as id FROM public.\"Relation\" WHERE \"GetUserId\"=" + userId + " AND \"Type\"=" + 1;
			ResultSet result = statement.executeQuery(sql);
			while(result.next()) {
				ids.add(result.getInt("id"));
			}
			ResultSet user;
			for(int id : ids) {
				sql = "SELECT * FROM public.\"User\" WHERE id=" + id;
				user = statement.executeQuery(sql);
				user.next();
				users.add(new FiltreUsers(user.getInt("id"), user.getString("name"), user.getString("surname"), user.getInt("online")));
			}
			statement.close();
			return users;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public ArrayList<FiltreUsers> getMyRequestsInFriendsByUser(int userId) {
		try {
			ArrayList<FiltreUsers> users = new ArrayList<FiltreUsers>();
			ArrayList<Integer> ids = new ArrayList<Integer>();
			Statement statement = connection.createStatement();
			String sql = "SELECT \"GetUserId\" as id FROM public.\"Relation\" WHERE \"SendUserId\"=" + userId + " AND \"Type\"=" + 1;
			ResultSet result = statement.executeQuery(sql);
			while(result.next()) {
				ids.add(result.getInt("id"));
			}
			ResultSet user;
			for(int id : ids) {
				sql = "SELECT * FROM public.\"User\" WHERE id=" + id;
				user = statement.executeQuery(sql);
				user.next();
				users.add(new FiltreUsers(user.getInt("id"), user.getString("name"), user.getString("surname"), user.getInt("online")));
			}
			statement.close();
			return users;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public ArrayList<FiltreUsers> getAllUsersByUser(int userId) {
		try {
			ArrayList<FiltreUsers> users = new ArrayList<FiltreUsers>();
			ArrayList<Integer> ids = new ArrayList<Integer>();
			Statement statement = connection.createStatement();
			String sql = "SELECT * FROM (SELECT id FROM public.\"User\"\r\n"
					+ "EXCEPT\r\n"
					+ "(SELECT \"SendUserId\" as id FROM public.\"Relation\" WHERE \"GetUserId\"=" + userId + "\r\n"
					+ "UNION \r\n"
					+ "SELECT \"GetUserId\" as id FROM public.\"Relation\" WHERE \"SendUserId\"="+ userId +")) AS a WHERE id<>" + userId;
			ResultSet result = statement.executeQuery(sql);
			while(result.next()) {
				ids.add(result.getInt("id"));
			}
			ResultSet user;
			for(int id : ids) {
				sql = "SELECT * FROM public.\"User\" WHERE id=" + id;
				user = statement.executeQuery(sql);
				user.next();
				users.add(new FiltreUsers(user.getInt("id"), user.getString("name"), user.getString("surname"), user.getInt("online")));
				System.out.println(user.getInt("online"));
			}
			statement.close();
			return users;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public void setOnlineStatus(int userId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "UPDATE public.\"User\" SET \"online\"=1 WHERE id=" + userId;
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void unsetOnlineStatus(int userId) {
		try {
			Statement statement = connection.createStatement();
			String sql = "UPDATE public.\"User\" SET \"online\"=0 WHERE id=" + userId;
			statement.executeUpdate(sql);
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public ArrayList<ChatToSend> getAllChats(int userId) {
		try {
			Statement statement = connection.createStatement();
			Statement statement2 = connection.createStatement();
			Statement statement3 = connection.createStatement();
			ArrayList<ChatToSend> chats = new ArrayList<ChatToSend>();
			String sql = "SELECT \r\n"
					+ "\"Chat\".\"id\" as \"id\", \r\n"
					+ "\"Chat\".\"name\" as \"chatName\",\r\n"
					+ "\"ChatImage\".\"path\" as \"chatImage\",\r\n"
					+ "\"Chat\".\"type\" as \"chatType\",\r\n"
					+ "\"Message\".\"text\" as \"messageText\",\r\n"
					+ "\"Message\".\"date\" as \"messageDate\",\r\n"
					+ "\"Message\".\"userId\" as \"messageUserId\",\r\n"
					+ "\"Message\".\"type\" as \"messageType\",\r\n"
					+ "(SELECT COUNT(\"Message\".\"id\") \r\n"
					+ " FROM public.\"Message\" WHERE \"Message\".\"chatId\" = \"Chat\".\"id\" \r\n"
					+ " 						AND \"Message\".\"type\" = 0 AND \"Message\".\"userId\" !=" + userId + " ) as \"countUnreaded\"\r\n"
					+ "FROM \"ChatAndUser\" \r\n"
					+ "JOIN public.\"Chat\" \r\n"
					+ "    ON \"ChatAndUser\".\"ChatId\" = \"Chat\".\"id\"\r\n"
					+ "LEFT JOIN \"Image\" as \"ChatImage\" \r\n"
					+ "    ON \"Chat\".\"image\" = \"ChatImage\".\"id\"\r\n"
					+ "LEFT JOIN \r\n"
					+ "    (SELECT \"chatId\", MAX(\"id\") as \"messageId\" FROM public.\"Message\" \r\n"
					+ "    GROUP BY \"chatId\") as \"maxMessTable\" \r\n"
					+ "    ON \"Chat\".\"id\" = \"maxMessTable\".\"chatId\"\r\n"
					+ "LEFT JOIN \"Message\" \r\n"
					+ "    ON \"maxMessTable\".\"messageId\" = \"Message\".\"id\"\r\n"
					+ "WHERE \"ChatAndUser\".\"UserId\" = " + userId + "\r\n"
					+ "ORDER BY \"Message\".\"date\" DESC nulls last, \"Chat\".\"date\" DESC";
			ResultSet result = statement.executeQuery(sql);
			while(result.next()) {
				String chatImage;
				String chatName = null;
				if(result.getInt("chatType") == 0) {
					System.out.println(result.getInt("id"));
					sql = "SELECT \"UserId\" FROM public.\"ChatAndUser\" WHERE \"ChatId\"=" + result.getInt("id") + " AND \"UserId\"<>" + userId;
					ResultSet iduser = statement2.executeQuery(sql);
					iduser.next();
					byte[] fileContent = FileUtils.readFileToByteArray(new File(getMainImagePath(iduser.getInt("UserId"))));
					chatImage = Base64.getEncoder().encodeToString(fileContent);
					
					
					sql = "SELECT * FROM public.\"User\" WHERE id=" + iduser.getInt("UserId");
					ResultSet name = statement3.executeQuery(sql);
					name.next();
					chatName = name.getString("name") + " " + name.getString("surname"); 
				}
				else {
					String path = getPhotoPath() + "chats\\default\\grLogo.jpg";
					byte[] fileContent = FileUtils.readFileToByteArray(new File(path));
					chatImage = Base64.getEncoder().encodeToString(fileContent);
					chatName = result.getString("chatName");
					System.out.println("logo1");
				}
				
				byte[] fileContent = FileUtils.readFileToByteArray(new File(getMainImagePath(result.getInt("messageUserId"))));
				String userImage = Base64.getEncoder().encodeToString(fileContent);
				chats.add(new ChatToSend(result.getInt("id"), chatName, chatImage, result.getString("messageText"), userImage, result.getString("messageDate"), 
										 result.getInt("messageType"), result.getInt("countUnreaded")));
			}
			statement.close();
			return chats;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public int createPrivateChat(int userIdF, int userIdS) {
		try {
			Statement statement = connection.createStatement();
			String sql = "SELECT \"ChatId\" FROM\r\n"
					+ "(\r\n"
					+ "SELECT \"ChatId\" FROM \"ChatAndUser\" WHERE \"UserId\" = " + userIdF + "\r\n"
					+ "INTERSECT\r\n"
					+ "SELECT \"ChatId\" FROM \"ChatAndUser\" WHERE \"UserId\" = " + userIdS + "\r\n"
					+ "INTERSECT\r\n"
					+ "SELECT \"ChatId\"\r\n"
					+ "FROM \"ChatAndUser\"\r\n"
					+ "GROUP BY \"ChatId\"\r\n"
					+ "HAVING COUNT(\"UserId\") = 2\r\n"
					+ ") as \"dialogChat\"";
			ResultSet result = statement.executeQuery(sql);
			if(!result.next()) {
				sql="INSERT INTO public.\"Chat\"(\"type\") VALUES(0)";
				statement.executeUpdate(sql);
				
				sql="INSERT INTO public.\"ChatAndUser\" VALUES((SELECT MAX(id) FROM public.\"Chat\")," + userIdF + ")";
				statement.executeUpdate(sql);
				sql="INSERT INTO public.\"ChatAndUser\" VALUES((SELECT MAX(id) FROM public.\"Chat\")," + userIdS + ")";
				statement.executeUpdate(sql);
			}
			sql = "SELECT \"ChatId\" FROM\r\n"
                    + "(\r\n"
                    + "SELECT \"ChatId\" FROM \"ChatAndUser\" WHERE \"UserId\" = " + userIdF + "\r\n"
                    + "INTERSECT\r\n"
                    + "SELECT \"ChatId\" FROM \"ChatAndUser\" WHERE \"UserId\" = " + userIdS + "\r\n"
                    + "INTERSECT\r\n"
                    + "SELECT \"ChatId\"\r\n"
                    + "FROM \"ChatAndUser\"\r\n"
                    + "GROUP BY \"ChatId\"\r\n"
                    + "HAVING COUNT(\"UserId\") = 2\r\n"
                    + ") as \"dialogChat\"";
            ResultSet chatIdResult = statement.executeQuery(sql);
            chatIdResult.next();
            int chatId = chatIdResult.getInt("ChatId");
            statement.close();
            return chatId;

		}
		catch(Exception ex) {
			ex.printStackTrace();
			return -1;
		}
	}
	
	public void createGroupChat(ArrayList<Integer> users) {
		try {
			Statement statement = connection.createStatement();
			ArrayList<String> names = new ArrayList<String>();
			for(int i = 0; i < 3; i++) {
				String sql = "SELECT \"name\" FROM public.\"User\" WHERE id=" + users.get(i);
				ResultSet name = statement.executeQuery(sql);
				if(name.next()) {
					names.add(name.getString("name"));
				}
			}
			String chatName = names.get(0) + ", " + names.get(1) + ", " + names.get(2);
			if(users.size() > 3) {
				chatName = names.get(0) + ", " + names.get(1) + ", " + names.get(2) + " and other";
			}
			String sql = "INSERT INTO public.\"Chat\"(\"name\", \"type\") VALUES(\'" + chatName + "\', 1)";
			statement.executeUpdate(sql);
			
			for(int user : users) {
				sql = "INSERT INTO public.\"ChatAndUser\" VALUES((SELECT MAX(id) FROM public.\"Chat\")," + user + ")";
				statement.executeUpdate(sql);
			}
			
			statement.close();
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public ArrayList<MessagesToSend> getChatMessages(int chatId) {
        try {
            Statement statement = connection.createStatement();
            Statement statement2 = connection.createStatement();
            ArrayList<MessagesToSend> messages = new ArrayList<MessagesToSend>();

            String sql = "SELECT * FROM public.\"Message\" WHERE \"chatId\"=" + chatId + " ORDER BY \"date\" ASC";
            ResultSet messagesResult = statement.executeQuery(sql);
            while(messagesResult.next()) {

                sql = "SELECT * FROM public.\"User\" WHERE id=" + messagesResult.getInt("userId");
                ResultSet user = statement2.executeQuery(sql);
                user.next();
                byte[] fileContent = FileUtils.readFileToByteArray(new File(getMainImagePath(user.getInt("id"))));
                String userImage = Base64.getEncoder().encodeToString(fileContent);
                String userName = user.getString("name") + " " + user.getString("surname"); 
                int userId = user.getInt("id");

                sql = "SELECT * FROM public.\"Image\" WHERE id=" + messagesResult.getInt("imageId");
                ResultSet image = statement2.executeQuery(sql);
                String messageImage = null;
                if(image.next()) {
                    fileContent = FileUtils.readFileToByteArray(new File(image.getString("path")));
                    messageImage = Base64.getEncoder().encodeToString(fileContent);
                }
                messages.add(new MessagesToSend(messagesResult.getInt("id"), messagesResult.getString("text"), messageImage, messagesResult.getString("date"), messagesResult.getInt("type"), 
                                                userId, userName, userImage));
            }
            return messages;
        }
        catch(Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
	
	public ChatInfo getChatInfo(int chatId, int userId) {
        try {
            Statement statement = connection.createStatement();
            Statement statement2 = connection.createStatement();

            ChatInfo chatInfo = null;

            String chatName;
            String chatImage;

            String sql = "SELECT * FROM public.\"Chat\" WHERE id=" + chatId;
            ResultSet typeChat = statement.executeQuery(sql);
            typeChat.next();
            if(typeChat.getInt("type") == 0) {
                sql = "SELECT * FROM public.\"ChatAndUser\" WHERE \"ChatId\"=" + chatId + " AND \"UserId\"<>" + userId;
                ResultSet idUserResult = statement.executeQuery(sql);
                idUserResult.next();

                sql = "SELECT * FROM public.\"User\" WHERE id=" + idUserResult.getInt("UserId");
                ResultSet userInfo = statement.executeQuery(sql);
                userInfo.next();
                chatName = userInfo.getString("name") + " " +userInfo.getString("surname");

                byte[] fileContent = FileUtils.readFileToByteArray(new File(getMainImagePath(userInfo.getInt("id"))));
                chatImage = Base64.getEncoder().encodeToString(fileContent);

                chatInfo = new ChatInfo(chatName, chatImage, userInfo.getInt("online"));
            }
            else {
                String path =  getPhotoPath() + "chats\\default\\grLogo.jpg";
                byte[] fileContent = FileUtils.readFileToByteArray(new File(path));
                chatImage = Base64.getEncoder().encodeToString(fileContent);

                chatInfo = new ChatInfo(typeChat.getString("name"), chatImage, -1);
            }
            return chatInfo;

        }
        catch(Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
	
	public void setReadMessages(int chatId, int userId) {
        try {
            Statement statement = connection.createStatement();
            String sql = "UPDATE public.\"Message\" SET type=1 WHERE \"chatId\"=" + chatId + " AND \"userId\"<>" + userId + ";";
            statement.executeUpdate(sql);
            statement.close();
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
    }
	
	public boolean equalPasswords(int userId, String password) {
        try {
            Statement statement = connection.createStatement();
            String sql = "SELECT * FROM public.\"User\" WHERE id=" + userId;
            ResultSet result = statement.executeQuery(sql);
            result.next();
            System.out.println(password + " " + result.getString("password"));
            String passwordFromDB = result.getString("password");
            if(Objects.equals(passwordFromDB, password)) {
                return true;
            }
            return false;
        }
        catch(Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }
	
	public void deleteProfileMessage(int userId) {
        try {
            Statement statement = connection.createStatement();
            String sql="UPDATE public.\"User\" SET image=NULL WHERE id=" + userId;
            statement.executeUpdate(sql);
            statement.close();
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
    }
	
	public void deletePost(int postId) {
        try {
            Statement statement = connection.createStatement();
            String sql = "DELETE FROM public.\"Post\" WHERE id=" + postId;
            statement.executeUpdate(sql);
            statement.close();
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
    }
	
	public int getChatNotifications(int userId) {
        try {
            Statement statement = connection.createStatement();
            String sql = "SELECT COUNT(\"chatId\") as chats FROM (SELECT DISTINCT \"chatId\" FROM public.\"Message\" \r\n"
                    + "WHERE \"userId\"<>" + userId + "\r\n"
                    + "AND \"type\"=0\r\n"
                    + "AND \"chatId\" IN (SELECT \"ChatId\" FROM public.\"ChatAndUser\" WHERE \"UserId\"=" + userId + ")) AS a";
            ResultSet chats = statement.executeQuery(sql);
            chats.next();
            int chatNotif = chats.getInt("chats");
            statement.close();
            return chatNotif;
        }
        catch(Exception ex) {
            ex.printStackTrace();
            return -1;
        }
    }

    public int getRequestNotification(int userId) {
        try {
            Statement statement = connection.createStatement();
            String sql="SELECT COUNT(\"SendUserId\") as users FROM(SELECT \"SendUserId\" FROM public.\"Relation\"\r\n"
                    + "WHERE \"GetUserId\"=" + userId + " AND \"Type\"=1) AS a";
            ResultSet users = statement.executeQuery(sql);
            users.next();
            int usersNotif = users.getInt("users");
            statement.close();
            return usersNotif;
        }
        catch(Exception ex) {
            ex.printStackTrace();
            return -1;
        }
    }

	public String getPhotoPath() {
		return photoPath;
	} 

	
}
